import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <div>
      {person.name}: {person.number}
    </div>
  )
}

const Persons = ({ list }) => {
  return (
    <div>
      {list.map(person =>
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const addNewEntry = (event) => {
    event.preventDefault()

    // Check to see if name is already part of phonebook
    // Source: https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
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
      <div>
        filter phonebook by name: <input value={nameFilter} onChange={handleNameFilterChange} />
      </div>
      <h3>Add a new entry</h3>
      <form onSubmit={addNewEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Persons list={personsToShow} />
    </div>
  )
}

export default App