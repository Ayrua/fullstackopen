import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    increaseVote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id == id);
      const anecdoteChanged = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : anecdoteChanged
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const increaseVoteOf = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(content.id, {
      ...content,
      votes: content.votes + 1,
    });
    dispatch(anecdoteSlice.actions.increaseVote(newAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
