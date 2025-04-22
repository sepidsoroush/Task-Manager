import { createSlice } from "@reduxjs/toolkit";
import { Board } from "@/models";
import {
  fetchBoardsWithTasks,
  addBoard,
  updateBoard,
  deleteBoard,
  addTask,
  updateTask,
  deleteTask,
  setActiveBoard,
} from "./boards-actions";
import { COLORS } from "@/lib/utils";

export const initialBoards: Board[] = [
  { id: "personal", title: "Personal", color: COLORS.cyan, tasks: [] },
  { id: "work", title: "Work", color: COLORS.amber, tasks: [] },
];

interface BoardsState {
  items: Board[];
  activeBoardId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BoardsState = {
  items: [],
  activeBoardId: null,
  status: "idle",
  error: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // Any local reducers if needed can go here
  },
  extraReducers: (builder) => {
    // Fetch boards with tasks
    builder
      .addCase(fetchBoardsWithTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBoardsWithTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.boards;
        state.activeBoardId = action.payload.activeBoardId;
      })
      .addCase(fetchBoardsWithTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Add board
    builder
      .addCase(addBoard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
        state.activeBoardId = action.payload.id;
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Update board
    builder
      .addCase(updateBoard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, updatedBoard } = action.payload;
        const index = state.items.findIndex((board) => board.id === id);
        if (index !== -1) {
          state.items[index] = updatedBoard;
        }
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Delete board
    builder
      .addCase(deleteBoard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { boardId, newActiveId } = action.payload;
        state.items = state.items.filter((board) => board.id !== boardId);
        if (state.activeBoardId === boardId) {
          state.activeBoardId = newActiveId;
        }
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Add task
    builder
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { boardId, task } = action.payload;
        const board = state.items.find((b) => b.id === boardId);
        if (board) {
          board.tasks.push(task);
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Update task
    builder
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { boardId, task } = action.payload;
        const board = state.items.find((b) => b.id === boardId);
        if (board) {
          const taskIndex = board.tasks.findIndex((t) => t.id === task.id);
          if (taskIndex !== -1) {
            board.tasks[taskIndex] = task;
          }
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Delete task
    builder
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { boardId, taskId } = action.payload;
        const board = state.items.find((b) => b.id === boardId);
        if (board) {
          board.tasks = board.tasks.filter((t) => t.id !== taskId);
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Set active board
    builder.addCase(setActiveBoard.fulfilled, (state, action) => {
      state.activeBoardId = action.payload;
    });
  },
});

export const boardsReducer = boardsSlice.reducer;
