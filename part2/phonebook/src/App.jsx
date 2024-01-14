import { useState, useEffect } from 'react'
import axios from 'axios'

const strCompare = (i, j) => i.toLowerCase() === j.toLowerCase()

const Names = ({ names }) => names.map((x) => <li key={x.name}>{x.name} {x.number}</li>)

const PersonForm = ({ submit, v1, onChange1, v2, onChange2 }) => {
  <form onSubmit={submit}>
    <div>
      name: <input value={v1} onChange={onChange1} />
    </div>
    <div>
      number: <input value={v2} onChange={onChange2} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const FilterForm = ({ onChange1 }) => <form>filter: <input onChange={onChange1} /></form>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (persons.filter(x => strCompare(x.name, newName)).length > 0) {
      console.log('dupe found')
      alert(`${newName} is already in the list`)
    }
    else setPersons([...persons, { name: newName, number: newNumber }])
  }

  const handleInputChange = (event) => {
    console.log('name', event.target.value)
    setNewName(event.target.value)
  }

  const handleInputChangeNumber = (event) => {
    console.log('number', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleInputChangeFilter = (event) => {
    console.log('filter', event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm onChange1={handleInputChangeFilter} />
      <h2>add a new</h2>
      <PersonForm submit={addNumber} v1={newName} v2={newNumber} onChange1={handleInputChange} onChange2={handleInputChangeNumber} />
      <h2>Numbers</h2>
      <div>
        <Names names={newFilter === '' ? persons : persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase()))} />
      </div>
    </div>
  )
}

export default App