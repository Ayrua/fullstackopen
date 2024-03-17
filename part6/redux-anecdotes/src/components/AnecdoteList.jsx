import { useSelector, useDispatch } from "react-redux";
import { increaseVoteOf } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    if (filter.filter !== "") {
      return state.anecdote.filter((a) =>
        a.content.toLowerCase().includes(filter.filter.toLowerCase())
      );
    }
    // console.log(filter.filter)
    return state.anecdote;
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(increaseVoteOf(id));
  };

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  console.log(sortedAnecdotes);
  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
