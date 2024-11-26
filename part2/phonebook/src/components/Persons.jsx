import Eliminar from "./Eliminar"
const Persons = ({persons, deletePerson}) => {
  return (
    <ul>
      {persons.map(person => <li key={person.name}>{person.name} {person.number} <Eliminar deletePerson={deletePerson} id={person.id}></Eliminar></li>)}
    </ul>
  )
}

export default Persons