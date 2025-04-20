import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Board } from "@/models";
import { useAppDispatch } from "@/store/hooks";
import { addBoard } from "@/store/boards-actions";
import { cn, COLORS } from "@/lib/utils";

interface BoardFormProps {
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  color: z.string(),
});

const BoardForm = ({ onOpenChange }: BoardFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      color: COLORS.red[100],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const board: Board = {
      id: values.title.toLowerCase().replace(/\s+/g, "-"),
      title: values.title,
      color: values.color,
      tasks: [],
    };

    dispatch(addBoard(board));
    form.reset();
    onOpenChange?.(false);
  }

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
                <Input placeholder="Board title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="grid grid-cols-11 gap-1.5 sm:gap-4">
                  {Object.entries(COLORS).map(([colorName, shades]) => (
                    <div key={colorName} className="space-y-1.5">
                      {Object.entries(shades).map(([shade, value]) => (
                        <button
                          key={`${colorName}-${shade}`}
                          type="button"
                          onClick={() => field.onChange(value)}
                          className={cn(
                            "w-full h-6 rounded-md border border-border transition-all hover:scale-110",
                            field.value === value &&
                              "ring-2 ring-ring ring-offset-2"
                          )}
                          style={{ backgroundColor: value }}
                          title={`${colorName}-${shade}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Add Board</Button>
        </div>
      </form>
    </Form>
  );
};

export default BoardForm;
