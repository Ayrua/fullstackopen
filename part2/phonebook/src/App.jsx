import { useState, useEffect } from 'react'
// import axios from 'axios'
import personService from './services/persons'

const strCompare = (i, j) => i.toLowerCase() === j.toLowerCase()

const Names = ({ names, onClick1 }) => names.map((x) => <li key={x.id}>{x.name} {x.number} <button onClick={() => onClick1(x.name, x.id)}>{"delete"}</button></li>)

const PersonForm = ({ submit, v1, onChange1, v2, onChange2 }) => {
  return (
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
  )
}

const FilterForm = ({ onChange1 }) => <form>filter: <input onChange={onChange1} /></form>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(initialData => {
      console.log('promise fulfilled')
      setPersons(initialData)
    })
  }, [])

  console.log('render', persons.length, 'persons')

  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (persons.filter(x => strCompare(x.name, newName)).length > 0) {
      // get the object
      console.log('dupe found')
      const targetObj = persons.filter((person) => person.name == newName)[0]
      //console.log(targetObj)
      if (newNumber != targetObj.number) {
        console.log('different number found')
        if (confirm(`update ${targetObj.name} number to ${newNumber}?`)) {
          console.log('updating person')
          let updatedObj = targetObj
          updatedObj.number = newNumber

          personService.update(targetObj.id, updatedObj)
            .then(initialData => {
              //console.log(initialData)
              const updatedPersons = persons.map( person => (targetObj.id === person.id) ? targetObj : person)
              setPersons(updatedPersons)
              setNewName('')
              setNewNumber('')
            })
        } else {
          alert(`${newName} is already in the list`)
        }
      }
    }
    else {
      const personObject = { name: newName, number: newNumber }
      
      personService.create(personObject)
        .then(initialData => {
          setPersons(persons.concat(initialData))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteName = (name, id) => {
    if (confirm(`delete ${name}?`)) {
      console.log(id)
      personService.delItem(id)
        .then(responseData => {
          console.log(`deleted id ${id}`)
          console.log(responseData)
          setPersons(persons.filter((person) => person.id != responseData.id))
          console.log('delete done')
        })
    }
    else console.log('canceled delete')
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
        <Names
          names={newFilter === '' ? persons : persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase()))}
          onClick1={deleteName}
        />
      </div>
    </div>
  )
}

export default App