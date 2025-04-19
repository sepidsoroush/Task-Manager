import axios from "axios";
import { Dispatch } from "redux";
import { getAuth } from "firebase/auth";
import { Board, Task } from "../models";
import { boardsActions } from "./features/boards-slice";
import { uiActions } from "./features/ui-slice";

const databaseURL = import.meta.env.VITE_DATABASE_URL;

// Fetch all boards and their tasks
export function fetchBoardsWithTasks() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      const res = await axios.get(`${databaseURL}/users/${userId}.json`);
      const data = res.data;

      const loadedBoards: Board[] = [];

      if (data) {
        for (const boardId in data) {
          const tasksObj = data[boardId] || {};
          const tasks: Task[] = Object.keys(tasksObj).map((taskId) => ({
            ...tasksObj[taskId],
          }));

          const boardMeta = JSON.parse(
            localStorage.getItem(`board-meta-${boardId}`) || "{}"
          );
          const title = boardMeta.title || boardId;
          const color = boardMeta.color || "#000";

          loadedBoards.push({ id: boardId, title, color, tasks });
        }
      }

      dispatch(boardsActions.setBoards(loadedBoards));

      // Set active board from localStorage if available
      const activeBoardId = localStorage.getItem("activeBoardId");
      if (activeBoardId) dispatch(boardsActions.setActiveBoard(activeBoardId));
      else if (loadedBoards.length > 0)
        dispatch(boardsActions.setActiveBoard(loadedBoards[0].id));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

// Add a board (with no tasks initially)
export function addBoard(board: Board) {
  return async (dispatch: Dispatch) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      // Save board meta locally
      localStorage.setItem(
        `board-meta-${board.id}`,
        JSON.stringify({ title: board.title, color: board.color })
      );

      dispatch(boardsActions.addBoard(board));
      dispatch(boardsActions.setActiveBoard(board.id));
      localStorage.setItem("activeBoardId", board.id);
    } catch (err) {
      console.error(err);
    }
  };
}

// Delete board
export function deleteBoard(boardId: string) {
  return async (dispatch: Dispatch, getState: any) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    const boards = getState().boards.items;
    if (boards.length <= 1) return; // Ensure at least one remains

    try {
      await axios.delete(`${databaseURL}/users/${userId}/${boardId}.json`);
      localStorage.removeItem(`board-meta-${boardId}`);

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

// Update board meta (title or color)
export function updateBoard(id: string, updated: Partial<Board>) {
  return async (dispatch: Dispatch, getState: any) => {
    const board = getState().boards.items.find((b: Board) => b.id === id);
    if (!board) return;

    const newBoard = { ...board, ...updated };
    localStorage.setItem(
      `board-meta-${id}`,
      JSON.stringify({ title: newBoard.title, color: newBoard.color })
    );

    dispatch(boardsActions.updateBoard({ id, board: newBoard }));
  };
}

// Add task to a board
export function addTask(boardId: string, task: Task) {
  return async (dispatch: Dispatch) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      await axios.put(
        `${databaseURL}/users/${userId}/${boardId}/${task.id}.json`,
        task
      );
      dispatch(boardsActions.addTask({ boardId, task }));
    } catch (err) {
      console.error(err);
    }
  };
}

// Update task in a board
export function updateTask(boardId: string, task: Task) {
  return async (dispatch: Dispatch) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      await axios.put(
        `${databaseURL}/users/${userId}/${boardId}/${task.id}.json`,
        task
      );
      dispatch(boardsActions.updateTask({ boardId, task }));
    } catch (err) {
      console.error(err);
    }
  };
}

// Delete task from a board
export function deleteTask(boardId: string, taskId: string) {
  return async (dispatch: Dispatch) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      await axios.delete(
        `${databaseURL}/users/${userId}/${boardId}/${taskId}.json`
      );
      dispatch(boardsActions.deleteTask({ boardId, taskId }));
    } catch (err) {
      console.error(err);
    }
  };
}
