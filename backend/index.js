import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import history from "connect-history-api-fallback";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(history());
app.use(express.static("dist"));

let persons = [{ id: "1", name: "Abel", number: "65966170" }];

//Obtener personas de la api
app.get("/api/persons", (req, res) => res.json(persons));

//Crear nueva persona
app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body.name) {
    return res.status(400).json({ error: "Falta el Nombre" });
  }
  if (!body.lastName) {
    return res.status(400).json({ error: "Falta el Apellido" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "Falta el Numero" });
  }
  const exists = persons.some(
    (p) =>
      p.name === body.name &&
      p.lastName === body.lastName &&
      p.number === body.number
  );
  if (exists) {
    return res.status(400).json({ error: "La Persona ya existes" });
  }
  const person = { ...body, id: Date.now().toString() };
  persons.push(person);
  res.json(person);
});

//Delete
// app.delete("/api/persons/:id", (req, res) => {
//   const id = req.params.id;
//   persons = persons.filter((p) => p.id !== req.params.id);
//   res.status(204).end();
// });//Delete
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id; // id recibido como string
  console.log("Eliminar id:", id); // log para debug

  // Filtramos correctamente
  const newPersons = persons.filter((p) => p.id !== id);

  // Verificamos si realmente cambió
  if (newPersons.length === persons.length) {
    return res.status(404).json({ error: "Persona no encontrada" });
  }

  persons = newPersons;
  res.status(204).end();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Servidor corriendo el PORT:${PORT}`));
