import { useState, useEffect } from 'react'
import personsService from './services/persons'

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

  const fetchPersons = () => {
    personsService
      .getAll()
      .then(list => {
        console.log('promise fulfilled')
        setPersons(list)
      })
  }
  console.log('render', persons.length, 'persons')

  useEffect(fetchPersons, [])

  const addNewEntry = (event) => {
    event.preventDefault()

    const id = persons.findIndex(person => person.name === newName) + 1

    // Check to see if name is already part of phonebook
    // Source: https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
    if ( id !== -1 && 
        window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

      const person = persons.find(p => p.id === id)
      const changedPerson = { ...person, number: newNumber }

      personsService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== id ? person : returnedPerson))
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from the server`
          )
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
      })
      .catch(() => {
        alert(
          `the person '${id}' was already deleted from server`
        )
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
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h3>Add a new entry</h3>
      <PersonForm addNewEntry={addNewEntry} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons list={personsToShow} removeEntry={removeEntry} />
    </div>
  )
}

export default App