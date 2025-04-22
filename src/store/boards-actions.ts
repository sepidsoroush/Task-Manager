import axios from "axios";
import { Dispatch, Action } from "redux";
import { getAuth } from "firebase/auth";
import { Board, Task } from "../models";
import { boardsActions } from "./features/boards-slice";
import { uiActions } from "./features/ui-slice";
import { RootState } from "./index";
import { ThunkAction } from "redux-thunk";
import { initialBoards } from "./features/boards-slice";

const databaseURL = import.meta.env.VITE_DATABASE_URL;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Fetch boards + their metadata and tasks
export function fetchBoardsWithTasks(): AppThunk {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    const userId = getAuth().currentUser?.uid;
    if (!userId) return dispatch(uiActions.setLoading(false));

    try {
      const res = await axios.get(`${databaseURL}/users/${userId}.json`);
      const data = res.data;
      const loadedBoards: Board[] = [];

      if (!data) {
        // No data yet, create initial boards
        for (const board of initialBoards) {
          await axios.put(
            `${databaseURL}/users/${userId}/${board.id}/meta.json`,
            { title: board.title, color: board.color }
          );
        }
        dispatch(boardsActions.setBoards(initialBoards));
        dispatch(boardsActions.setActiveBoard("personal"));
        localStorage.setItem("activeBoardId", "personal");
      } else {
        for (const boardId in data) {
          const meta = data[boardId]?.meta;
          const tasksData = data[boardId]?.tasks || {};
          const tasks: Task[] = Object.values(tasksData);
          loadedBoards.push({
            id: boardId,
            title: meta?.title || boardId,
            color: meta?.color || "#000000",
            tasks,
          });
        }

        dispatch(boardsActions.setBoards(loadedBoards));

        // Set active board from localStorage or fallback to first
        const activeBoardId = localStorage.getItem("activeBoardId");
        dispatch(
          boardsActions.setActiveBoard(
            activeBoardId || loadedBoards[0]?.id || "personal"
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

// Add board
export function addBoard(board: Board): AppThunk {
  return async (dispatch: Dispatch) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      await axios.put(`${databaseURL}/users/${userId}/${board.id}/meta.json`, {
        title: board.title,
        color: board.color,
      });
      dispatch(boardsActions.addBoard({ ...board, tasks: [] }));
      dispatch(boardsActions.setActiveBoard(board.id));
      localStorage.setItem("activeBoardId", board.id);
    } catch (err) {
      console.error(err);
    }
  };
}

// Update board metadata (title or color)
export function updateBoard(
  id: string,
  updated: Partial<Pick<Board, "title" | "color">>
): AppThunk {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      const board = getState().boards.items.find((b) => b.id === id);
      if (!board) return;

      const newBoard = { ...board, ...updated };
      await axios.put(`${databaseURL}/users/${userId}/${id}/meta.json`, {
        title: newBoard.title,
        color: newBoard.color,
      });

      dispatch(boardsActions.updateBoard({ id, board: newBoard }));
    } catch (err) {
      console.error(err);
    }
  };
}

// Delete board
export function deleteBoard(boardId: string): AppThunk {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    const boards = getState().boards.items;
    if (boards.length <= 1) return;

    try {
      await axios.delete(`${databaseURL}/users/${userId}/${boardId}.json`);
      dispatch(boardsActions.deleteBoard(boardId));

      const updatedBoards = getState().boards.items;
      const newActive = updatedBoards[0]?.id;
      dispatch(boardsActions.setActiveBoard(newActive));
      localStorage.setItem("activeBoardId", newActive);
    } catch (err) {
      console.error(err);
    }
  };
}

// Add a task to a board
export function addTask(boardId: string, task: Task): AppThunk {
  return async (dispatch: Dispatch) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    dispatch(boardsActions.addTask({ boardId, task }));

    try {
      await axios.put(
        `${databaseURL}/users/${userId}/${boardId}/tasks/${task.id}.json`,
        task
      );
    } catch (err) {
      console.error(err);
      dispatch(boardsActions.deleteTask({ boardId, taskId: task.id }));
    }
  };
}

// Update a task
export function updateTask(
  boardId: string,
  task: Task,
  prevTask?: Task
): AppThunk {
  return async (dispatch: Dispatch) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    dispatch(boardsActions.updateTask({ boardId, task }));

    try {
      await axios.put(
        `${databaseURL}/users/${userId}/${boardId}/tasks/${task.id}.json`,
        task
      );
    } catch (err) {
      console.error(err);
      if (prevTask) {
        dispatch(boardsActions.updateTask({ boardId, task: prevTask }));
      }
    }
  };
}

// Delete a task
export function deleteTask(boardId: string, taskId: string): AppThunk {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    const task = getState()
      .boards.items.find((b) => b.id === boardId)
      ?.tasks.find((t) => t.id === taskId);

    dispatch(boardsActions.deleteTask({ boardId, taskId }));

    try {
      await axios.delete(
        `${databaseURL}/users/${userId}/${boardId}/tasks/${taskId}.json`
      );
    } catch (err) {
      console.error(err);
      if (task) dispatch(boardsActions.addTask({ boardId, task }));
    }
  };
}

// Set active board
export function updateActiveBoard(boardId: string): AppThunk {
  return (dispatch: Dispatch) => {
    dispatch(boardsActions.setActiveBoard(boardId));
    localStorage.setItem("activeBoardId", boardId);
  };
}
