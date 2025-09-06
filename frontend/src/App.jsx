import services from "./services/persons";
import { useState, useEffect } from "react";
import Note from "./Componente/Note";

const App = () => {
  const [persons, setPerson] = useState([]);
  const [NewName, setName] = useState("");
  const [NewLastName, setLastName] = useState("");
  const [NewNumber, setNumber] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleNumChange = (e) => setNumber(e.target.value);

  useEffect(() => {
    services.getAll().then((data) => setPerson(data));
  }, []);

  //Funcion para crear nueva persona
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: NewName,
      lastName: NewLastName,
      number: Number(NewNumber),
    };
    services
      .create(newPerson)
      .then((retunPerson) => {
        setPerson([...persons, retunPerson]);
        setName("");
        setNumber("");
        setLastName("");
      })
      .catch((error) => {
        console.log("Error al crear persona", error.response.data.error);
        alert(error.response.data.error);
      });
  };

  //Funcion Elimina
  const handleDelete = (id) => {
    const personaDelete = persons.find((p) => p.id === id);
    const confinm = window.confirm(
      `Estas seguro que quieres eliminar ${personaDelete.name}`
    );

    if (confinm) {
      services
        .deletePerson(id)
        .then(() => {
          setPerson(persons.filter((p) => p.id !== id));
        })
        .then(window.alert(`La ${personaDelete.name} fue eliminada`));
    }
  };

  return (
    <>
      <h1>Nueva Persona</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={NewName}
          onChange={handleNameChange}
          placeholder="Nombre"
        />
        <input
          type="text"
          onChange={handleLastNameChange}
          value={NewLastName}
          placeholder="Apellido"
        />
        <input
          type="number"
          onChange={handleNumChange}
          value={NewNumber}
          placeholder="Numero"
        />
        <button type="submit">Agregar</button>
      </form>
      <hr></hr>
      {persons.map((n) => (
        <li key={n.id}>
          <Note note={n} />

          <button onClick={() => handleDelete(n.id)}>Eliminar</button>
        </li>
      ))}
    </>
  );
};

export default App;
