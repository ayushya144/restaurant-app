// import { createSlice } from "@reduxjs/toolkit";
// import { menuData } from "components/sidebar/menuData";

// interface SidebarState {
//   sideBarItems: typeof menuData; // Inferring the type from the menuData structure
// }

// const initialState: SidebarState = {
//   sideBarItems: [...menuData],
// };

// export const sideBarSlice = createSlice({
//   name: "sideBar",
//   initialState,
//   reducers: {},
// });

// // Selector to get sidebar items from the state
// export const sideBarItemSelector = (state: { sidebar: SidebarState }) =>
//   state.sidebar.sideBarItems;

// const sideBar = sideBarSlice.reducer;
// export default sideBar;
