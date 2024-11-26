import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { useEffect } from 'react'
import axios from 'axios'
import phoneService from './services/phoneService'
import './app.css'
import Notification from './components/Notification'
import NotificationErrors from './components/NotificationError'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const [newPhone, setNewPhone] = useState('')

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const resetForm = () => {
    setNewName('')
    setNewPhone('')
  }

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newPhone
    }
    const nameExists = persons.some(person => person.name === newName)
    const phoneExists = persons.some(person => person.number === newPhone)

    if (nameExists && phoneExists) {
      alert(`${newName} is already added to phonebook`)
      resetForm()
      return
    } else if (nameExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newPhone }
        phoneService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            resetForm()
            setSuccessMessage(`Updated ${newName}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          }).catch(error => {
            setErrorMessage(
              `Information of '${newName}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setPersons(persons.filter(p => p.id !== person.id))
          }
          )
        return
      }
    }
    phoneService
      .create(nameObject).then(returnedName => {
        setPersons(persons.concat(returnedName))
        resetForm()
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Estas seguro que quieres eliminar a ${person.name}`)){

    phoneService
    .eliminar(id, person)
    .then(response => {
      setPersons(persons.filter(n => n.id !== id))
      alert(
        "Persona eliminada correctamente"
      )
    })
    .catch(error => {
      alert(
        `the person '${person.name}' was already deleted from server`
      )
    })
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <NotificationErrors message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} addName={addName} />  
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App