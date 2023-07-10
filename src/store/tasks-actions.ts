import axios from "axios";
import { Dispatch } from "redux";
import { tasksActions } from "./tasks-slice";
import { uiActions } from "./ui-slice";
import Task from "../models/tasks";

const API_ENDPOINT =
  "https://task-manager-8e8a5-default-rtdb.firebaseio.com/tasks";

export function setDataAction() {
  return (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    axios
      .get(`${API_ENDPOINT}.json`)
      .then((response) => {
        const dataObj = response.data;
        const loadedData = [];
        for (const key in dataObj) {
          loadedData.push({
            id: dataObj[key].id,
            text: dataObj[key].text,
            date: dataObj[key].date,
            time: dataObj[key].time,
          });
        }
        dispatch(tasksActions.setItems({ tasks: loadedData }));
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
      .delete(`${API_ENDPOINT}/${id}.json`)
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
    const data = { ...task, id: task.id };
    axios
      .post(`${API_ENDPOINT}.json`, data)
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
      .put(`${API_ENDPOINT}/${id}.json`, task)
      .then(() => {
        dispatch(tasksActions.updateItem({ id, task }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
