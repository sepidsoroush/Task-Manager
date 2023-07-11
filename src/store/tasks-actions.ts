import axios from "axios";
import { Dispatch } from "redux";
import { tasksActions } from "./tasks-slice";
import { uiActions } from "./ui-slice";
import Task from "../models/tasks";

const databaseURL =
  "https://task-manager-8e8a5-default-rtdb.firebaseio.com/tasks";

export function setDataAction() {
  return (dispatch: Dispatch) => {
    dispatch(uiActions.setLoading(true));
    axios
      .get(`${databaseURL}.json`)
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
      .get(`${databaseURL}.json`)
      .then((response) => {
        const items = response.data;
        const keysToDelete = Object.keys(items).filter(
          (key) => items[key] === id
        );
        const deleteRequests = keysToDelete.map((key) =>
          axios.delete(`${databaseURL}/${key}.json`)
        );
        Promise.all(deleteRequests);
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
      .post(`${databaseURL}.json`, task)
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
      .put(`${databaseURL}/${id}.json`, task)
      .then(() => {
        dispatch(tasksActions.updateItem({ id, task }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
