import { useState } from 'react'

const Header = ({title}) => {
  return <h1>{title}</h1>
}

const StatisticLine = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.text2}</td>
    </tr>
  )
}

const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = props.all

  if (all === 0) return <p>no feedback given</p>
  else return (
    <table>
    <StatisticLine text={'good'} value={good}/>
    <StatisticLine text={'neutral'} value={neutral}/>
    <StatisticLine text={'bad'} value={bad}/>
    <StatisticLine text={'all'} value={all}/>
    <StatisticLine text={'average'} value={(good * 1 + neutral * 0 + bad * -1) / all}/>
    <StatisticLine text={'positive'} text2={'%'} value={(good) / all}/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setValue = (value, setFunc) => {
    const newValue = value + 1
    console.log('setting', value, 'to', newValue)
    setFunc(newValue)
    // console.log(good)
    const newAllValue = all + 1
    setAll(newAllValue)
  }


  return (
    <div>
      <Header title={'give feedback'}/>
      <Button handleClick={() => setValue(good, setGood)} text="good" />
      <Button handleClick={() => setValue(neutral, setNeutral)} text="neutral" />
      <Button handleClick={() => setValue(bad, setBad)} text="bad" />
      <Header title={'statistics'}/>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

export default App