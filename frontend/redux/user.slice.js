import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  name: "",
  courses: [],
  lectures: [],
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setCourse: (state, { payload }) => {
      state.courses = payload;
    },
    setLecture: (state, { payload }) => {
      state.lectures = payload;
    },
  },
});

export const { authenticate, logout, setRole, setCourse, setLecture } =
  userSlice.actions;
export default userSlice.reducer;
