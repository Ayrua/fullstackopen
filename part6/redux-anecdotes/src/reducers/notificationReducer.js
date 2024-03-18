import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

// time in seconds
export const setNotification = (content, time = 5) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.changeNotification(content));

    setTimeout(
      () => dispatch(notificationSlice.actions.clearNotification()),
      time * 1000
    );
  };
};

export default notificationSlice.reducer;
