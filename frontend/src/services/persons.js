import axios from "axios";

//A que api vamos a consumir.?
const baseURL = "http://localhost:5000/api/persons";

//Obtener personas del api
const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};
export default { getAll, create, deletePerson };

// const hola = ()=>{}
