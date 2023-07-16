import "./RegistrarEntradaSalidaComponent.css";

import { ChangeEvent, useState } from "react";

import { URL_API_NODE } from "../../config";
import { IUserEntryRequest } from "../../Models/UserRequest";
import { IUserResponse } from "../../Models/UserResponse";

function RegistroEntradaSalidaComponent() {
	const [dni, setdni] = useState("");

	function cambiarDni(event: ChangeEvent<HTMLInputElement>) {
		setdni(event.target.value);
	}

	return (
		<div className="container container2 App">
			<p className="Intro"> Inserte su DNI para continuar:</p>
			<label>DNI</label>
			<input className="col-md-1" type="text" value={dni} onChange={cambiarDni} />
			<button
				className="btn btn-success"
				onClick={() => {
					registrarEntrada(dni).catch((error) => {
						console.error(error);
					});
				}}
			>
				Entrada
			</button>
			<button
				className="btn btn-danger"
				onClick={() => {
					registrarSalida(dni).catch((error) => {
						console.error(error);
					});
				}}
			>
				Salida
			</button>
		</div>
	);

	async function registrarEntrada(dni: string) {
		const id = await obtenerIdUsuario(dni);
		if (id !== "") {
			await updateEntrada(id, true);
		}
	}

	async function registrarSalida(dni: string) {
		const id = await obtenerIdUsuario(dni);
		if (id !== "") {
			await updateEntrada(id, false);
		}
	}

	async function obtenerIdUsuario(dni: string): Promise<string> {
		const response = await fetch(`${URL_API_NODE}/usuario?DNI=${dni}`);
		const user = (await response.json()) as IUserResponse[];

		return user[0]._id;
	}

	async function updateEntrada(idUsuario: string, esEntrada: boolean) {
		const dataToSend: IUserEntryRequest = {
			Id: idUsuario,
			EstaEnOficina: esEntrada,
		};
		const response = await fetch(`${URL_API_NODE}/actualizarUsuario`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataToSend),
		});
		const respuesta = (await response.json()) as IUserResponse;

		return respuesta;
	}
}
export default RegistroEntradaSalidaComponent;
