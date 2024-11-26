const Eliminar = ({deletePerson, id}) => {

    return(
        <button onClick={() => deletePerson(id)}>Delete</button>
    )
}

export default Eliminar