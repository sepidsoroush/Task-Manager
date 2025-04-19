import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./features/tasks-slice";
import uiSlice from "./features/ui-slice";
import boardsSlice from "./features/boards-slice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    boards: boardsSlice.reducer,
    ui: uiSlice.reducer,
  },
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
