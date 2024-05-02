import axios from "axios";
import { Dispatch } from "redux";
import { tasksActions } from "./features/tasks-slice";
import { uiActions } from "./features/ui-slice";
import Task from "../models/tasks";

const databaseURL = import.meta.env.VITE_DATABASE_URL;

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
    dispatch(uiActions.setLoading(true));

    axios
      .get(`${databaseURL}.json`)
      .then((response) => {
        const dataObj = response.data;
        const key = Object.keys(dataObj).find(
          (key) => dataObj[key].id === taskID
        );
        if (key) {
          axios
            .delete(`${databaseURL}/${key}.json`)
            .then(() => {
              dispatch(tasksActions.deleteItem(taskID));
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
      })
      .finally(() => {
        dispatch(uiActions.setLoading(false));
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
    dispatch(uiActions.setLoading(true));

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
      })
      .finally(() => {
        dispatch(uiActions.setLoading(false));
      });
  };
}
