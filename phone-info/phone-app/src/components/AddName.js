import React from 'react'



import PersonService from '../services/PersonService';

 const AddName = ({ newName, setNewName, persons, setPersons, handleNameChange, newNumber, setNewNumber, handleNumberChange, handleUpdate, handleMessageToGo, handleInfoMessageErrorUpdate }) => {
  const addNameButton = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to the phone book. Do you want to update ${existingPerson.name}'s phone number?`
      );

      if (confirmUpdate) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        };

        PersonService.update(existingPerson.id, updatedPerson)
          .then(() => {
            const updatedPersons = persons.map(person =>
              person.id === existingPerson.id ? updatedPerson : person
            );
            setPersons(updatedPersons);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            handleInfoMessageErrorUpdate(`Info of ${updatedPerson.name} has been already deleted from the list.`, error);
            setPersons(persons.filter((person) => person.id !== existingPerson.id))
            setNewName('');
            setNewNumber('');
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };

      PersonService
        .create(newPerson, )
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          handleMessageToGo(`Person ${newPerson.name} has been added to the list`);
          setNewName('');
          setNewNumber('');
          
        })
        .catch((error) => {
          console.error('Error adding person:', error);
         
        });
    }
  };



  return (
    <div>
      <form onSubmit={addNameButton}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
         number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit"> - click here to add a new name - </button>
        </div>
      </form>
    </div>
  );
};

export default AddName;
