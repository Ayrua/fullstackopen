import { createAnecdote } from "../services/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "./NotificationContext";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: (newAnecdote) => {
      dispatch({
        type: "SHOW",
        payload:
          newAnecdote.content +
          " is too short, it needs at least a length of 5!",
      });
      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 5000);
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    const newAnecdote = { content: content, votes: 0 };
    newAnecdoteMutation.mutate(newAnecdote);
    dispatch({
      type: "SHOW",
      payload: "you added " + newAnecdote.content,
    });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
