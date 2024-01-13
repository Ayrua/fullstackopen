import { useState } from 'react'

const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const VotesDisplay = props => {
  let val = 0
  if (val < props.value) val = props.value
  return (
    <>'has' {val} 'votes')</>
  )
}

const HighestDisplay = props => {
    const anecdotes = props.anecdotes
    const votes = props.votes
    let maxkey = Object.keys(votes)[0]
    for (const vote in votes){
      if (votes[maxkey] < votes[vote]){
        maxkey = vote
      }
    }
    return <>{anecdotes[maxkey]}</>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const setValue = (setFunc) => {
    const rnd = Math.floor(Math.random() * anecdotes.length);
    console.log('random value', rnd);
    setFunc(rnd);
    //console.log('set to random anecdote')
  }

  const setVote = (selected, setFunc) => {
    console.log('adding votes to ', selected);
    let newVotes = 0;
    if (selected in votes){
      newVotes = votes[selected] + 1
    }
    else newVotes = 1
    setFunc({...votes, [selected]:newVotes});
    //console.log(votes);
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      {anecdotes[selected]}
      <p>
        <VotesDisplay value={votes[selected]}/>
      </p>
      <p>
        <Button handleClick={() => setVote(selected, setVotes)} text="vote" />
        <Button handleClick={() => setValue(setSelected)} text="next anecdote" />
      </p>
      <h1>anecdote with most votes</h1>
      <HighestDisplay anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App