import "./ListaUsuariosComponent.css";

import { useEffect, useState } from "react";
// https://icons.getbootstrap.com/
import * as Icon from "react-bootstrap-icons";

import { IUserRequest } from "../../Models/UserRequest";
import { IUserResponse } from "../../Models/UserResponse";
import EditarUsuariosModal from "../EditarUsuarios/EditarUsuariosModal";

function ListaUsuariosComponent() {
	const [usuario, setUsuario] = useState<IUserResponse[]>([]);
	const [refresh, setRefresh] = useState({});
	const [datosModal, setDatosModal] = useState({ id: "", show: false });

	useEffect(async () => {
		async function fetchData() {
			const listaUsuarios = await getListaUsuarios();
			setUsuario(listaUsuarios);
		}
		await fetchData();
	}, [refresh]);

	return (
		<div>
			<table className="table">
				<thead className="table1">
					<tr>
						<th className="text-center" scope="col">
							DNI
						</th>
						<th className="text-center" scope="col">
							Nombre
						</th>
						<th className="text-center" scope="col">
							Apellido
						</th>
						<th className="text-center" scope="col">
							Última fecha entrada
						</th>
						<th className="text-center" scope="col">
							Última fecha salida
						</th>
						<th className="text-center" scope="col">
							Está en oficina
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{usuario.map(function (usuario: IUserResponse) {
						return (
							<tr>
								<th className="text-center" scope="row">
									{usuario.DNI}
								</th>
								<td className="text-center">{usuario.Nombre}</td>
								<td className="text-center">{usuario.Apellido}</td>
								<td className="text-center">{usuario.FechaUltimaEntrada.toString()}</td>
								<td className="text-center">{usuario.FechaUltimaSalida.toString()}</td>
								<td className="text-center">
									{usuario.EstaEnOficina ? (
										<Icon.CheckCircle color="green" />
									) : (
										<Icon.XCircle color="red" />
									)}
								</td>
								<td>
									<button onClick={() => editarUsuario(usuario._id)} className="btn btn-primary">
										<Icon.PencilFill />
									</button>
									<button onClick={() => borrarUsuario(usuario._id)} className="btn btn-danger">
										<Icon.Trash />
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{datosModal.show ? (
				<EditarUsuariosModal
					idUsuario={datosModal.id}
					showModal={true}
					onCloseModal={function () {
						setRefresh({});
						setDatosModal({ id: "", show: false });
					}}
				/>
			) : (
				<></>
			)}
		</div>
	);

	async function getListaUsuarios(): Promise<IUserResponse[]> {
		const response = fetch(`http://localhost:55434/listaUsuarios`)
			.then((response) => response.json())
			.then((respuesta) => respuesta);

		return (await response) as IUserResponse[];
	}

	async function borrarUsuario(idUsuario: string): Promise<void> {
		const userRequest: IUserRequest = { Id: idUsuario };
		await fetch(`http://localhost:55434/borrarUsuario`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userRequest),
		})
			.then((response) => response.json())
			.then((respuesta) => respuesta);

		// Insertamos en el usuario para ejecutar el UseEffect y que se actualice la tabla
		setUsuario(usuario);
		setRefresh({});
	}

	function editarUsuario(idUsuario: string) {
		setDatosModal({
			id: idUsuario,
			show: true,
		});
	}
}
export default ListaUsuariosComponent;
