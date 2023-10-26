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

const CountryName = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false)

  if (showInfo) {
    return (
      <div>
        {country.name.common}
        <button onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? 'hide' : 'show'}
        </button>
        <CountryInfo key={country.name.common} country={country} />
      </div>
    )  
  }
  else {
    return (
      <div>
        {country.name.common}
        <button onClick={() => setShowInfo(!showInfo)}>
          show
        </button>
      </div>
    )
  }

  
}

const CountryInfo = ({ country }) => {

  const [weather, setWeather] = useState()
  const [isLoading, setLoading] = useState(true)

  

  const fetchWeather = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}&units=metric`
    console.log('effect')
    axios
      .get(weatherAPI)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
        setLoading(false)
      })
  }

  useEffect(fetchWeather, [country.capital])
  console.log(weather)

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

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
      <h2>Weather in {country.capital}</h2>
      <div>temperature {weather.main.temp} degrees Celcius</div>
      <div><img src={weatherIcon} alt="icon for weather"/></div>
      <div>wind {weather.wind.speed} m/s</div>
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
          <CountryName key={country.name.common} country={country} />
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
    console.log('fetchCountries: effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('fetchCountries promise fulfilled')
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
