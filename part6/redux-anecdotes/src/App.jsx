import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const Anecdotes = () => {
    const anecdotes = useSelector((state) => state);
    const dispatch = useDispatch();

    const vote = (id) => {
      console.log("vote", id);
      return {
        type: "VOTE",
        payload: { id },
      };
    };

    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
    console.log(sortedAnecdotes);
    return sortedAnecdotes.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
        </div>
      </div>
    ));
  };

  const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = (event) => {
      event.preventDefault();
      const anecdote = event.target.anecdote.value;
      event.target.anecdote.value = "";
      dispatch({
        type: "ADD",
        payload: { anecdote },
      });
    };

    return (
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    );
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  );
};

export default App;
