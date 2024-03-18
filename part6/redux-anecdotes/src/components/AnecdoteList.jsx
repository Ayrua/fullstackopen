import { useSelector, useDispatch } from "react-redux";
import { increaseVoteOf } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    if (filter.filter !== "") {
      //console.log(filter);
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
    const anecdoteToChange = anecdotes.find((a) => a.id == id);
    dispatch(increaseVoteOf(anecdoteToChange));
    dispatch(
      setNotification(
        'you have voted on "' + anecdoteToChange.content + '".'
      )
    );
    //setTimeout(() => dispatch(changeNotification("")), 5000);
  };
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
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
