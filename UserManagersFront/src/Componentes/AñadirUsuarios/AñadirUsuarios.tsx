import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { IUserResponse } from '../../Models/UserResponse';
import './AñadirUsuarios.css'

function AñadirUsuarios() {
    const [dni, setdni] = useState("")

    function cambiarDni(event: ChangeEvent<HTMLInputElement>) {
        setdni(event.target.value);
    }

    const [nombre, setNombre] = useState("")

    function cambiarNombre(event: ChangeEvent<HTMLInputElement>) {
        setNombre(event.target.value);
    }

    const [apellidos, setApellidos] = useState("")

    function cambiarApellidos(event: ChangeEvent<HTMLInputElement>) {
        setApellidos(event.target.value);
    }
    return (
        <div className="container AñadirUsuario">
            <p className="trabajador">Añada los datos del nuevo trabajador:</p>
            <label>DNI</label>
            <input type="text" value={dni} onChange={cambiarDni} />


            <label>Nombre</label>
            <input type="text" value={nombre} onChange={cambiarNombre} />


            <label>Apellidos</label>
            <input type="text" value={apellidos} onChange={cambiarApellidos} />

            <button className="btn btn-success" onClick={() => añadirUsuarioFetch(nombre, apellidos, dni)} >Añadir</button>
        </div>
    )

    async function añadirUsuarioFetch(nombreUsuario: string, apellidoUsuario: string, dniUsuario: string) {
        let response = await fetch(`http://localhost:55434/crearUsuario`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Nombre: nombreUsuario, Apellido: apellidoUsuario, DNI: dniUsuario })
        })
        let respuesta = await (response.json()) as IUserResponse;
        console.log(respuesta)
        //alert("Se ha añadido correctamente");
    }

}
export default AñadirUsuarios;



