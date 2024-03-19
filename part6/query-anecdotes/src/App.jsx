import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./services/requests";
import { useNotificationDispatch } from "./components/NotificationContext";

const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const updatedAnecArr = anecdotes.map((a) =>
        a.id == updatedAnecdote.id ? updatedAnecdote : a
      );
      queryClient.setQueryData(["anecdotes"], updatedAnecArr);
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote");
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    newAnecdoteMutation.mutate(updatedAnecdote);
    dispatch({
      type: "SHOW",
      payload: "you voted on " + updatedAnecdote.content,
    });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>anecdote service not available due to problems on server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
