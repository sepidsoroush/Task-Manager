import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, Task } from "../../models";
import { COLORS } from "@/lib/utils";

interface BoardsState {
  items: Board[];
  activeBoardId: string;
}

const storedActive = localStorage.getItem("activeBoardId");
const initialActive = storedActive || "personal";
if (!storedActive) {
  localStorage.setItem("activeBoardId", initialActive);
}

export const initialBoards: Board[] = [
  { id: "personal", title: "Personal", color: COLORS.cyan, tasks: [] },
  { id: "work", title: "Work", color: COLORS.amber, tasks: [] },
];

const initialState: BoardsState = {
  items: initialBoards,
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
