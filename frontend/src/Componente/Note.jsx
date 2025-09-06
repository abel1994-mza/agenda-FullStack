const Note = ({ note }) => {
  return (
    <>
      Nombre: {note.name} / Apellido : {note.apellido} / Telefono:{" "}
      {note.number + " "}
    </>
  );
};

export default Note;
