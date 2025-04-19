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
      const response = await axios.get(`${databaseURL}/users/${userId}.json`);
      const dataObj = response.data;
      const loadedData: Task[] = [];

      if (dataObj) {
        for (const key in dataObj) {
          const task = dataObj[key];
          loadedData.push(task);
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
      await axios.delete(`${databaseURL}/users/${userId}/${taskID}.json`);
      dispatch(tasksActions.deleteItem(taskID));
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
      await axios.put(`${databaseURL}/users/${userId}/${task.id}.json`, task);
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
      await axios.put(`${databaseURL}/users/${userId}/${id}.json`, task);
      dispatch(tasksActions.updateItem({ id, task }));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  };
}
