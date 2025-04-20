import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, Task } from "../../models";

interface BoardsState {
  items: Board[];
  activeBoardId: string;
}

const storedActive = localStorage.getItem("activeBoardId");
const initialActive = storedActive || "personal";
if (!storedActive) {
  localStorage.setItem("activeBoardId", initialActive);
}

const initialState: BoardsState = {
  items: [
    {
      id: "personal",
      title: "Personal",
      color: "oklch(78.9% 0.154 211.53)",
      tasks: [],
    },
    {
      id: "work",
      title: "Work",
      color: "oklch(89.7% 0.196 126.665)",
      tasks: [],
    },
  ],
  activeBoardId: initialActive,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // Boards
    setBoards(state, action: PayloadAction<Board[]>) {
      state.items = action.payload;
    },
    addBoard(state, action: PayloadAction<Board>) {
      state.items.push(action.payload);
    },
    updateBoard(state, action: PayloadAction<{ id: string; board: Board }>) {
      const index = state.items.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload.board;
    },
    deleteBoard(state, action: PayloadAction<string>) {
      if (state.items.length <= 1) return; // always keep at least one
      state.items = state.items.filter((b) => b.id !== action.payload);
      if (state.activeBoardId === action.payload) {
        state.activeBoardId = state.items[0]?.id;
      }
    },
    setActiveBoard(state, action: PayloadAction<string>) {
      const exists = state.items.some((b) => b.id === action.payload);
      if (exists) {
        state.activeBoardId = action.payload;
        localStorage.setItem("activeBoardId", action.payload);
      }
    },

    // Tasks inside a board
    addTask(state, action: PayloadAction<{ boardId: string; task: Task }>) {
      const board = state.items.find((b) => b.id === action.payload.boardId);
      if (board) board.tasks.push(action.payload.task);
    },
    updateTask(state, action: PayloadAction<{ boardId: string; task: Task }>) {
      const board = state.items.find((b) => b.id === action.payload.boardId);
      if (!board) return;
      const index = board.tasks.findIndex(
        (t) => t.id === action.payload.task.id
      );
      if (index !== -1) board.tasks[index] = action.payload.task;
    },
    deleteTask(
      state,
      action: PayloadAction<{ boardId: string; taskId: string }>
    ) {
      const board = state.items.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.tasks = board.tasks.filter((t) => t.id !== action.payload.taskId);
      }
    },
    setTasks(state, action: PayloadAction<{ boardId: string; tasks: Task[] }>) {
      const board = state.items.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.tasks = action.payload.tasks;
      }
    },
  },
});

export const boardsActions = boardsSlice.actions;
export default boardsSlice;
