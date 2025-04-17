import axios from "axios";
import { Dispatch } from "redux";
import { tasksActions } from "./features/tasks-slice";
import { uiActions } from "./features/ui-slice";
import Task from "../models/tasks";
import { getAuth } from "firebase/auth";

const databaseURL = import.meta.env.VITE_DATABASE_URL;

export function setDataAction() {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));

    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      const response = await axios.get(
        `${databaseURL}/users/${userId}/tasks.json`
      );
      const dataObj = response.data;
      const loadedData: Task[] = [];

      if (dataObj) {
        for (const key in dataObj) {
          const task = dataObj[key].task;
          loadedData.push({
            id: task.id,
            title: task.title,
            description: task.description,
            date: task.date,
            status: task.status,
          });
        }
      }

      dispatch(tasksActions.setItems({ tasks: loadedData }));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function deleteAction(taskID: string) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));

    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      const response = await axios.get(
        `${databaseURL}/users/${userId}/tasks.json`
      );
      const dataObj = response.data;

      const key = Object.keys(dataObj).find(
        (key) => dataObj[key].task.id === taskID
      );

      if (key) {
        await axios.delete(`${databaseURL}/users/${userId}/tasks/${key}.json`);
        dispatch(tasksActions.deleteItem(taskID));
      } else {
        console.log("Task not found in database.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}

export function addAction(task: Task) {
  return async (dispatch: Dispatch) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      const response = await axios.post(
        `${databaseURL}/users/${userId}/tasks.json`,
        { task }
      );
      dispatch(tasksActions.addItem(task));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateAction(id: string, task: Task) {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));

    const userId = getAuth().currentUser?.uid;
    if (!userId) return;

    try {
      const response = await axios.get(
        `${databaseURL}/users/${userId}/tasks.json`
      );
      const dataObj = response.data;

      const key = Object.keys(dataObj).find(
        (key) => dataObj[key].task.id === id
      );

      if (key) {
        await axios.put(`${databaseURL}/users/${userId}/tasks/${key}.json`, {
          task,
        });
        dispatch(tasksActions.updateItem({ id, task }));
      } else {
        console.log("Task not found in database.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}
