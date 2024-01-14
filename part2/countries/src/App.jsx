import { useState, useEffect } from 'react'
import countriesService from './services/countries'


const SearchField = ({ onChange1 }) => <form>find countries: <input onChange={onChange1} /></form>

const LanguageList = (country) => {
  const languages = Object.keys(country.country.languages).map(x => country.country.languages[x])
  return (
    <ul>
      {languages.map(x => <li>{x}</li>)}
    </ul>
  )
}

const FlagImage = (country) => {
  const flag = country.country.flags.png
  return <img src={flag}></img>
}

const CountriesList = ({ countries, filter, onClick1 }) => {
  if (filter === '') return
  const filterCountr = countries.filter(x => x.name.common.toLowerCase().includes(filter.toLowerCase()))
  const filterLength = filterCountr.length
  // console.log(filterLength)
  // console.log(filterCountr)
  if (filterLength > 10) {
    return <p>{'too many matches, be more specific'}</p>
  } else if (filterLength > 1) {
    const filterNames = filterCountr.map(x => <li key={x.ccn3}>{x.name.common} <button onClick={() => onClick1(x.name.common)}>{"show"}</button></li>)
    return filterNames
  } else if (filterLength == 1) {
    const targetCountry = filterCountr[0]
    return (
      <div>
        <h2>{targetCountry.name.common}</h2>
        <p />
        <li>{'capital: '} {targetCountry.capital}</li>
        <li>{'area: '} {targetCountry.area}</li>
        <p />
        <LanguageList country={targetCountry} />
        <p />
        <FlagImage country={targetCountry} />
      </div>
    )
  }
}


function App() {
  const [newSearch, setNewSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    countriesService.getAllCountries().then(initialData => {
      console.log('promise fulfilled')
      setAllCountries(initialData)
    })
  }, [])

  const handleInputChangeSearch = (event) => {
    console.log('search', event.target.value)
    setNewSearch(event.target.value)

  }

  const showSelected = (name) => {
    setNewSearch(name)
  }

  return (
    <div>
      <SearchField
        onChange1={handleInputChangeSearch}
      />
      <CountriesList
        countries={allCountries}
        filter={newSearch}
        onClick1={showSelected}
      />
    </div>
  )
}

export default App
