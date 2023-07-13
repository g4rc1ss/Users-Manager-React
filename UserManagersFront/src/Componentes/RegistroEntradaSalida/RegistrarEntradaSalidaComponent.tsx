import { ChangeEvent, useReducer, useState } from 'react'
import './RegistrarEntradaSalidaComponent.css';
import { IUserResponse } from '../../Models/UserResponse';
import { IUserCommandRequest, IUserEntryRequest, IUserRequest } from '../../Models/UserRequest';

function RegistroEntradaSalidaComponent() {
  const [dni, setdni] = useState("")

  function cambiarDni(event: ChangeEvent<HTMLInputElement>) {
    setdni(event.target.value)
  }

  return (
    <div className="container container2 App">
      <p className="Intro"> Inserte su DNI para continuar:</p>
      <label >DNI</label>
      <input className="col-md-1" type="text" value={dni} onChange={cambiarDni} />
      <button className="btn btn-success" onClick={() => registrarEntrada(dni)} >Entrada</button>
      <button className="btn btn-danger" onClick={() => registrarSalida(dni)} >Salida</button>
    </div>
  );


  async function registrarEntrada(dni: string) {
    let id = await obtenerIdUsuario(dni)
    if (id !== undefined) {
      await updateEntrada(id, true);
    }

  }

  async function registrarSalida(dni: string) {
    let id = await obtenerIdUsuario(dni);
    if (id !== undefined) {
      await updateEntrada(id, false);
    }
  }

  async function obtenerIdUsuario(dni: string): Promise<string> {
    let response = await fetch(`http://localhost:55434/usuario?DNI=${dni}`)
      .then(response => response.json())
      .then(respuesta => respuesta);
    let user = await (response) as IUserResponse[];
    console.log(user);
    return user[0]._id
  }

  async function updateEntrada(idUsuario: string, esEntrada: boolean) {
    const dataToSend : IUserEntryRequest = {
      Id: idUsuario,
      EstaEnOficina: esEntrada
    }
    let response = await fetch(`http://localhost:55434/actualizarUsuario`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    })
    let respuesta = await response.json();
    console.log(respuesta)
    return respuesta;
  }

}
export default RegistroEntradaSalidaComponent;
