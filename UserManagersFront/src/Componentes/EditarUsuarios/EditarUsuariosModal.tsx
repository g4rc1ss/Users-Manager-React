import "./EditarUsuariosComponent.css";

import { ChangeEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { IUserCommandRequest } from "../../Models/UserRequest";
import { IUserResponse } from "../../Models/UserResponse";

function EditarUsuariosModal(props: {
	showModal: any;
	onCloseModal: () => void;
	idUsuario: string;
}) {
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [dni, setDni] = useState("");

	const [show, setShow] = useState(props.showModal);

	const handleClose = function () {
		setShow(false);
		props.onCloseModal();
	};

	function cambiarNombre(event: ChangeEvent<HTMLInputElement>) {
		setNombre(event.target.value);
	}
	function cambiarApellido(event: ChangeEvent<HTMLInputElement>) {
		setApellido(event.target.value);
	}
	function cambiarDni(event: ChangeEvent<HTMLInputElement>) {
		setDni(event.target.value);
	}

	useEffect(() => {
		async function fetchData() {
			const datosUsuario = await obtenerDatosUsuario(props.idUsuario);
			setNombre(datosUsuario.Nombre);
			setApellido(datosUsuario.Apellido);
			setDni(datosUsuario.DNI);
		}
		fetchData();
	}, []);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Editar Usuario</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="text-cente">
						<div className="col-md-12">
							<label className="col-md-2">Nombre: </label>
							<input className="col-md-8" type="text" value={nombre} onChange={cambiarNombre} />
						</div>
						<div className="col-md-12">
							<label className="col-md-2">Apellido: </label>
							<input className="col-md-8" type="text" value={apellido} onChange={cambiarApellido} />
						</div>
						<div className="col-md-12">
							<label className="col-md-2">DNI: </label>
							<input className="col-md-8" type="text" value={dni} onChange={cambiarDni} />
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={() => saveChanges(props.idUsuario, nombre, apellido, dni)}
					>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);

	async function saveChanges(idUsuario: string, nombre: string, apellido: string, dni: string) {
		const data: IUserCommandRequest = {
			Id: idUsuario,
			Nombre: nombre,
			Apellido: apellido,
			DNI: dni,
		};
		await fetch(`http://localhost:55434/actualizarUsuario`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		handleClose();
	}

	async function obtenerDatosUsuario(idUsuario: string): Promise<IUserResponse> {
		const response = await fetch(`http://localhost:55434/usuario?id=${idUsuario}`)
			.then((response) => response.json())
			.then((respuesta) => respuesta);
		const user = (await response) as IUserResponse[];
		console.log(user);

		return user[0];
	}
}
export default EditarUsuariosModal;
