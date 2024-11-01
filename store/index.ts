import { combineReducers, configureStore, AnyAction } from "@reduxjs/toolkit";

import cart from "./slices/cart";
// import sidebar from "./slices/sidebar";
import user from "./slices/user";
import apiInstance from "./apis/createApiInstance";
// import theme from "./theme";

const rootReducer = combineReducers({
  //   theme,
  cart,
  user,
  //   sidebar,
  [apiInstance.reducerPath]: apiInstance.reducer,
});

const reducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: AnyAction
) => {
  //   if (action.type === "logout") {
  //     state = { theme: state?.theme }; // Keeping theme when logging out
  //   }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiInstance.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
