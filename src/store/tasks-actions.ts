import axios from "axios";
import { Dispatch } from "redux";
import { tasksActions } from "./tasks-slice";
import { uiActions } from "./ui-slice";
import Task from "../models/tasks";

const API_ENDPOINT =
  "https://task-manager-8e8a5-default-rtdb.firebaseio.com/tasks.json";

export function setDataAction() {
  return (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    axios
      .get(API_ENDPOINT)
      .then((response) => {
        dispatch(tasksActions.setItems({ tasks: response.data }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(uiActions.setLoading(false));
      });
  };
}

export function deleteAction(id: string) {
  return (dispatch: Dispatch) => {
    axios
      .delete(`${API_ENDPOINT}/${id}`)
      .then(() => {
        dispatch(tasksActions.deleteItem(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function addAction(task: Task) {
  return (dispatch: Dispatch) => {
    axios
      .post(`${API_ENDPOINT}`, task)
      .then(() => {
        dispatch(tasksActions.addItem(task));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateAction(id: string, task: Task) {
  return (dispatch: Dispatch) => {
    axios
      .put(`${API_ENDPOINT}/${id}`, task)
      .then(() => {
        dispatch(tasksActions.updateItem({ id, task }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
