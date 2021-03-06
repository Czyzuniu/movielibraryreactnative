import {configureStore} from '@reduxjs/toolkit'
import {moviesApi} from "../services/movies";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "../services/auth";
import {accountApi} from "../services/account";
import sessionReducer from '../slice/session/index';
import {listApi} from "../services/list";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviesApi.middleware)
      .concat(authApi.middleware)
      .concat(accountApi.middleware)
      .concat(listApi.middleware)
})

setupListeners(store.dispatch)

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
