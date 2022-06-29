import { useState, useEffect } from 'react'
import axios from 'axios'

const TextInput = ({ text, value, onChange }) => {
  return (
    <div>
      {text}: <input value={value} onChange={onChange} />
    </div>
  )
}

const Filter = ({ nameFilter, handleNameFilterChange }) => {
  return (
    <div>
      <TextInput text={'find countries'} value={nameFilter} onChange={handleNameFilterChange} />
    </div>
  )
}

const CountryName = ({ name }) => {
  return (
    <div>
      {name}
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <div>
        <img src={country.flags.png} alt="flag of current country"/>
      </div>
    </div>
  )
}

const Countries = ({ list }) => {

  console.log(list.length)

  if (list.length === 1) {
    return (
      <div>
        {list.map(country =>
          <CountryInfo key={country.name.common} country={country} />
        )}
      </div>
    )
  }
  else if (list.length < 10) {
    return (
      <div>
        {list.map(country =>
          <CountryName key={country.name.common} name={country.name.common} />
        )}
      </div>
    )
  }
  else {
    return (
      <div>
        too many matches, specify another filter
      </div>
    )
  }

}



const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  const fetchCountries = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  console.log('render', countries.length, 'countries')
  console.log(countries)

  useEffect(fetchCountries, [])

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <div>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <Countries list={countriesToShow} />
    </div>
  )
}

export default App;
