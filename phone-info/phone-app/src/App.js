import React, { useState, useEffect } from 'react';
import AddName from './components/AddName';
import Filter from './components/Filter';
import PersonsList from './components/PersonsList';
import PersonService from './services/PersonService'
import './index.css'
import Message from './components/Message';
import InfoMessageError from './components/InfoMessageError';


const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])


    useEffect(() => {
      PersonService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
    }, [])

const handleDelete = (id) => {
  PersonService
        .nameTakeOut(id)
        .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
        });
    };

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [messageToGo, setMessageToGo] = useState('');
  const [infoMessageErrorUpdate, setInfoMessageErrorUpdate] = useState('')

  const handleInfoMessageErrorUpdate = (infoMessage) => {
    setInfoMessageErrorUpdate(infoMessage);
    setTimeout(() => {
      setInfoMessageErrorUpdate('')
    }, 9000);
}


  const handleMessageToGo = (message) => {
    setMessageToGo(message);
    setTimeout(() => {
      setMessageToGo('');
    }, 5000);
  };


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(newFilter.toLowerCase())
)

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={messageToGo} />
      <InfoMessageError infoMessage={infoMessageErrorUpdate} />
      <Filter
        newFilter={newFilter}
        setNewFilter={setNewFilter}
        handleFilterChange={handleFilterChange}
  
      />

      <h3>Add a new name and number to the list: </h3>
      <AddName
        newName={newName}
        setNewName={setNewName}
        persons={persons}
        setPersons={setPersons}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNumberChange={handleNumberChange}
        handleMessageToGo={handleMessageToGo}
        handleInfoMessageErrorUpdate={handleInfoMessageErrorUpdate}
  
      />
      <h3>List of names and numbers: </h3>
      <PersonsList filteredPersons={filteredPersons} onDelete={handleDelete}/>
      
    </div>
  );
}

export default App;
