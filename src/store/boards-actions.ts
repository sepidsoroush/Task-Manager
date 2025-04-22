import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { Board, Task } from "../models";
import { RootState } from "./index";
import { initialBoards } from "./boards-slice";

const databaseURL = import.meta.env.VITE_DATABASE_URL;

// Helper function to get current user ID
const getCurrentUserId = () => {
  const userId = getAuth().currentUser?.uid;
  if (!userId) throw new Error("User not authenticated");
  return userId;
};

// Fetch boards with their tasks
export const fetchBoardsWithTasks = createAsyncThunk(
  "boards/fetchBoardsWithTasks",
  async (_, { rejectWithValue }) => {
    try {
      const userId = getCurrentUserId();
      const res = await axios.get(`${databaseURL}/users/${userId}.json`);
      const data = res.data;

      if (!data) {
        for (const board of initialBoards) {
          await axios.put(
            `${databaseURL}/users/${userId}/${board.id}/meta.json`,
            { title: board.title, color: board.color }
          );
        }

        return {
          boards: initialBoards,
          activeBoardId: localStorage.getItem("activeBoardId") || "personal",
        };
      } else {
        const loadedBoards: Board[] = [];

        for (const boardId in data) {
          const meta = data[boardId]?.meta;
          const tasksData = data[boardId]?.tasks || {};
          const tasks: Task[] = Object.keys(tasksData).map(
            (key) => tasksData[key]
          );

          loadedBoards.push({
            id: boardId,
            title: meta?.title || boardId,
            color: meta?.color || "#000000",
            tasks,
          });
        }

        const activeBoardId =
          localStorage.getItem("activeBoardId") ||
          loadedBoards[0]?.id ||
          "personal";

        return {
          boards: loadedBoards,
          activeBoardId,
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch boards");
    }
  }
);

// Add a new board
export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (board: Board, { rejectWithValue }) => {
    try {
      const userId = getCurrentUserId();

      await axios.put(`${databaseURL}/users/${userId}/${board.id}/meta.json`, {
        title: board.title,
        color: board.color,
      });

      localStorage.setItem("activeBoardId", board.id);

      return { ...board, tasks: [] };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to add board");
    }
  }
);

// Update board metadata
export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (
    {
      id,
      updates,
    }: { id: string; updates: Partial<Pick<Board, "title" | "color">> },
    { getState, rejectWithValue }
  ) => {
    try {
      const userId = getCurrentUserId();
      const state = getState() as RootState;
      const board = state.boards.items.find((b) => b.id === id);

      if (!board) {
        return rejectWithValue("Board not found");
      }

      const updatedBoard = { ...board, ...updates };

      await axios.put(`${databaseURL}/users/${userId}/${id}/meta.json`, {
        title: updatedBoard.title,
        color: updatedBoard.color,
      });

      return { id, updatedBoard };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update board");
    }
  }
);

// Delete a board
export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId: string, { getState, rejectWithValue }) => {
    try {
      const userId = getCurrentUserId();
      const state = getState() as RootState;
      const boards = state.boards.items;

      if (boards.length <= 1) {
        return rejectWithValue("Cannot delete the last board");
      }

      const boardRef = `${databaseURL}/users/${userId}/${boardId}.json`;

      const checkRes = await axios.get(boardRef);
      if (!checkRes.data) {
        console.error("Board not found in Firebase:", boardId);
        return rejectWithValue("Board not found in database");
      }

      const deleteRes = await axios.delete(boardRef);
      if (deleteRes.status !== 200) {
        return rejectWithValue("Failed to delete board from database");
      }

      const verifyRes = await axios.get(boardRef);
      if (verifyRes.data !== null) {
        console.error("Board was not successfully deleted:", boardId);
        return rejectWithValue("Board deletion verification failed");
      }

      const newBoards = boards.filter((b) => b.id !== boardId);
      const newActiveId = newBoards[0]?.id;

      if (newActiveId) {
        localStorage.setItem("activeBoardId", newActiveId);
      }

      return { boardId, newActiveId };
    } catch (error) {
      console.error("Delete board error:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to delete board");
    }
  }
);

// Add task to a board
export const addTask = createAsyncThunk(
  "boards/addTask",
  async (
    { boardId, task }: { boardId: string; task: Task },
    { rejectWithValue }
  ) => {
    try {
      const userId = getCurrentUserId();

      await axios.put(
        `${databaseURL}/users/${userId}/${boardId}/tasks/${task.id}.json`,
        task
      );

      return { boardId, task };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to add task");
    }
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  "boards/updateTask",
  async (
    { boardId, task }: { boardId: string; task: Task },
    { rejectWithValue }
  ) => {
    try {
      const userId = getCurrentUserId();

      await axios.put(
        `${databaseURL}/users/${userId}/${boardId}/tasks/${task.id}.json`,
        task
      );

      return { boardId, task };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update task");
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "boards/deleteTask",
  async (
    { boardId, taskId }: { boardId: string; taskId: string },
    { rejectWithValue }
  ) => {
    try {
      const userId = getCurrentUserId();

      await axios.delete(
        `${databaseURL}/users/${userId}/${boardId}/tasks/${taskId}.json`
      );

      return { boardId, taskId };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to delete task");
    }
  }
);

// Set active board
export const setActiveBoard = createAsyncThunk(
  "boards/setActiveBoard",
  async (boardId: string) => {
    localStorage.setItem("activeBoardId", boardId);
    return boardId;
  }
);
