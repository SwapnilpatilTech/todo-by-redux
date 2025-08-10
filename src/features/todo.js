import { createSlice } from "@reduxjs/toolkit";

const savedTodo = JSON.parse(localStorage.getItem("redux-todo")) || [];

const todoSlice = createSlice({
  name: "todos",
  initialState: savedTodo,
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        title: action.payload,
        status: false,
      });
    },

    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.find((t) => t.id === id);
      if (todo) {
        todo.title = title;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    changeStatus: (state, action) => {
      const done = state.find((item) => item.id === action.payload);
      if (done) {
        done.status = !done.status;
      }
    },
  },
});

export const { addTodo, changeStatus, updateTodo, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
