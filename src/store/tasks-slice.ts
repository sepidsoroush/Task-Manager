import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Task from "../models/tasks";

// Define a type for the slice state
interface tasksState {
  items: Task[];
}

// Define the initial state using that type
const initialState: tasksState = {
  items: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ tasks: Task[] }>) {
      state.items = action.payload.tasks;
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((row) => row.id !== action.payload);
    },
    addItem(state, action: PayloadAction<Task>) {
      state.items = state.items.concat(action.payload);
    },
    updateItem(state, action: PayloadAction<{ id: string; task: Task }>) {
      const existingItem = state.items.find(
        (row) => row.id === action.payload.id
      );
      if (existingItem) {
        existingItem.text = action.payload.task.text;
        existingItem.date = action.payload.task.date;
        existingItem.time = action.payload.task.time;
        existingItem.status = action.payload.task.status;
      }
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice;
