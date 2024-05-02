"use client";

import { Dispatch, SetStateAction } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Task from "@/models/tasks";
import { useAppDispatch } from "@/store/hooks";
import { addAction, updateAction, deleteAction } from "@/store/tasks-actions";

import { IconCalendar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type ActionType = "create" | "update";

interface TaskFormProps {
  actionType: ActionType;
  taskToUpdate?: Task;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(50, {
      message: "Title must not be longer than 50 characters.",
    }),
  description: z
    .string()
    .max(500, {
      message: "Description must not be longer than 500 characters.",
    })
    .optional(),
  date: z.date().optional(),
  status: z.string(),
});

const TaskForm = ({
  actionType,
  taskToUpdate,
  onOpenChange,
}: TaskFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      ...(taskToUpdate && taskToUpdate), // Set default values if updating
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const task: Task = {
      id: taskToUpdate ? taskToUpdate.id : new Date().getTime().toString(),
      title: values.title,
      description: values.description,
      date: values.date,
      status: values.status,
    };

    if (actionType === "create") {
      dispatch(addAction(task));
    } else if (actionType === "update") {
      dispatch(updateAction(task.id, task));
    }

    form.reset();
    onOpenChange(false);
  }

  const onDelete = () => {
    if (taskToUpdate) {
      dispatch(deleteAction(taskToUpdate.id));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the task"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="Doing">Doing</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-4 text-left">
          {actionType === "update" ? (
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          ) : null}
          <Button type="submit">
            {actionType === "create" ? "Add Task" : "Update Task"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default TaskForm;
