import { useState, useEffect } from 'react'
import personsService from './services/persons'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const TextInput = ({ text, value, onChange }) => {
  return (
    <div>
      {text}: <input value={value} onChange={onChange} />
    </div>
  )
}

const Filter = ({nameFilter, handleNameFilterChange}) => {
  return (
    <div>
      <TextInput text={'filter phonebook by name'} value={nameFilter} onChange={handleNameFilterChange} />
    </div>
  )
}

const PersonForm = ({ addNewEntry, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addNewEntry}>
      <TextInput text={'name'} value={newName} onChange={handleNameChange} />
      <TextInput text={'number'} value={newNumber} onChange={handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person, removeEntry }) => {
  return (
    <div>
      {person.name}: {person.number}
      <button onClick={removeEntry}>delete</button>
    </div>
  )
}

const Persons = ({ list, removeEntry }) => {
  return (
    <div>
      {list.map(person =>
        <Person key={person.id} person={person} removeEntry={() => removeEntry(person.id)} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const fetchPersons = () => {
    personsService
      .getAll()
      .then(list => {
        console.log('promise fulfilled')
        setPersons(list)
      })
  }
  console.log('render', persons.length, 'persons')
  console.log(persons)

  useEffect(fetchPersons, [])

  const addNewEntry = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)

    // Check to see if name is already part of phonebook
    // Source: https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
    if ( person && 
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

      console.log(person)
      const id = person.id
      const changedPerson = { ...person, number: newNumber }

      personsService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== id ? person : returnedPerson))
          setSuccessMessage(
            `Updated ${person.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000) 
        })
        .catch(error => {
          setErrorMessage(
            `the person '${person.name}' has already been deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      personsService
        .create(nameObject)
        .then(newEntry => {
          setPersons(persons.concat(newEntry))
          setSuccessMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000) 
        })
        .catch(error => {
          // process error message from backend
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      
    }
    setNewName('')
    setNewNumber('')
  }

  const removeEntry = (id) => {
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
        setSuccessMessage(
          `Removed entry ${id}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000) 
      })
      .catch(() => {
        setErrorMessage(
          `the person '${id}' has already been deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = persons.filter( person => 
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h3>Add a new entry</h3>
      <PersonForm addNewEntry={addNewEntry} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons list={personsToShow} removeEntry={removeEntry} />
    </div>
  )
}

export default App