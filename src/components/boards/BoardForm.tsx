import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBoard, updateBoard, deleteBoard } from "@/store/boards-actions";
import { Board } from "@/models";
import { IconInfoCircle } from "@tabler/icons-react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters"),
  color: z.string(),
});

type Props = {
  onOpenChange: (open: boolean) => void;
  actionType?: "create" | "update";
};

const BoardForm = ({ onOpenChange, actionType = "create" }: Props) => {
  const dispatch = useAppDispatch();
  const activeBoardId = useAppSelector((state) => state.boards.activeBoardId);
  const boards = useAppSelector((state) => state.boards.items);
  const activeBoard = useAppSelector((state) =>
    state.boards.items.find((b) => b.id === activeBoardId)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: actionType === "update" ? activeBoard?.title : "",
      color: actionType === "update" ? activeBoard?.color : COLORS.red,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const isDuplicate = boards.some((board) => {
      if (actionType === "update" && board.id === activeBoardId) {
        return false;
      }
      return board.title.toLowerCase() === values.title.toLowerCase();
    });

    if (isDuplicate) {
      form.setError("title", {
        type: "manual",
        message: "A board with this title already exists",
      });
      return;
    }

    if (actionType === "create") {
      const board: Board = {
        id: new Date().getTime().toString(),
        title: values.title,
        color: values.color,
        tasks: [],
      };
      dispatch(addBoard(board));
    } else {
      dispatch(
        updateBoard({
          id: activeBoardId || "",
          updates: { title: values.title, color: values.color },
        })
      );
    }

    form.reset();
    onOpenChange(false);
  };

  const onDelete = () => {
    if (activeBoardId) {
      dispatch(deleteBoard(activeBoardId));
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
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <div className="grid grid-cols-10 gap-2">
                  {Object.entries(COLORS).map(([colorName, value]) => (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => field.onChange(value)}
                      className={cn(
                        "w-full aspect-square rounded-md border border-border transition-all hover:scale-110 rounded-full",
                        field.value === value &&
                          "ring-2 ring-ring ring-offset-2"
                      )}
                      style={{ backgroundColor: value }}
                      title={colorName}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col flex-end gap-2 pt-4">
          <div className="flex justify-start space-x-2">
            <Button type="submit">
              {actionType === "create" ? "Add Board" : "Update Board"}
            </Button>
            {actionType === "update" ? (
              <Button variant="destructive" onClick={onDelete}>
                Delete
              </Button>
            ) : null}
          </div>
          {actionType === "update" ? (
            <div className="flex flex-row items-start gap-1 text-xs text-neutral-500">
              <IconInfoCircle className="h-4 w-4" />
              <span>
                Deleting the board will also delete all tasks associated with
                it.
              </span>
            </div>
          ) : null}
        </div>
      </form>
    </Form>
  );
};

export default BoardForm;
