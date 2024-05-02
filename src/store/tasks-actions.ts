import axios from "axios";
import { Dispatch } from "redux";
import { tasksActions } from "./features/tasks-slice";
import { uiActions } from "./features/ui-slice";
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
            title: dataObj[key].title,
            description: dataObj[key].description,
            date: dataObj[key].date,
            status: dataObj[key].status,
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

export function deleteAction(taskID: string) {
  return (dispatch: Dispatch) => {
    axios
      .get(`${databaseURL}.json`)
      .then((response) => {
        const tasks = response.data;
        const itemKey = Object.keys(tasks).find(
          (key) => tasks[key].id === taskID
        );
        axios.delete(`${databaseURL}/${itemKey}.json`);
        dispatch(tasksActions.deleteItem(taskID));
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
      .get(`${databaseURL}.json`)
      .then((response) => {
        const dataObj = response.data;
        const key = Object.keys(dataObj).find(
          (dataKey) => dataObj[dataKey].id === id
        );
        if (key) {
          axios
            .put(`${databaseURL}/${key}.json`, task)
            .then(() => {
              dispatch(tasksActions.updateItem({ id, task }));
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("Task not found in database.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
