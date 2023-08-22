import React from "react";

const PersonsList = ({ filteredPersons, onDelete }) => {
  const handleDelete = (id) => {
    const personToDelete = filteredPersons.find((person) => person.id === id);
    const confirmDelete = window.confirm(
      `You are deleting ${personToDelete.name}. Are you sure you want to delete ${personToDelete.name}?`
    );
    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <div>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonsList;
