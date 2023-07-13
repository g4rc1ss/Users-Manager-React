import { ChangeEvent, useState } from 'react'
import './RegistrarEntradaSalidaComponent.css';
import { IUserResponse } from '../../Models/UserResponse';

function RegistroEntradaSalidaComponent() {
  const [dni, setdni] = useState("")

  function cambiarDni(event: ChangeEvent) {
    setdni(event.target.nodeValue as string)
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

  async function obtenerIdUsuario(dni: string) {
    let response = await fetch(`http://localhost:55434/listaUsuarios?DNI=${dni}`);
    let respuesta = await (response.json()) as IUserResponse;
    console.log(respuesta._id)
    return respuesta._id
  }

  async function updateEntrada(idUsuario: string, esEntrada: boolean) {
    let response = await fetch(`http://localhost:55434/actualizarUsuario`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Id: idUsuario, estaEnOficina: esEntrada })
    })
    let respuesta = await response.json();
    console.log(respuesta)
    return respuesta;
  }

}
export default RegistroEntradaSalidaComponent;
