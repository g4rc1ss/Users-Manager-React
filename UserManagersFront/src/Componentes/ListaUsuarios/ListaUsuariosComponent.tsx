import { useState } from 'react';
import { useEffect } from 'react';
import './ListaUsuariosComponent.css'

import EditarUsuariosModal from '../EditarUsuarios/EditarUsuariosModal';

// https://icons.getbootstrap.com/
import * as Icon from 'react-bootstrap-icons';
import { IUserResponse } from '../../Models/UserResponse';
import { IUserRequest } from '../../Models/UserRequest';


function ListaUsuariosComponent() {
    const [usuario, setUsuario] = useState<IUserResponse[]>([]);
    const [refresh, setRefresh] = useState({});
    const [datosModal, setDatosModal] = useState({ id: "", show: false })

    useEffect(() => {
        async function fetchData() {
            let listaUsuarios = await getListaUsuarios();
            setUsuario(listaUsuarios);
        }
        fetchData();
    }, [refresh])

    return (
        <div>
            <table className="table">
                <thead className="table1">
                    <tr>
                        <th className="text-center" scope="col">DNI</th>
                        <th className="text-center" scope="col">Nombre</th>
                        <th className="text-center" scope="col">Apellido</th>
                        <th className="text-center" scope="col">Última fecha entrada</th>
                        <th className="text-center" scope="col">Última fecha salida</th>
                        <th className="text-center" scope="col">Está en oficina</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuario.map(function (usuario: IUserResponse) {
                            return (
                                <tr >
                                    <th className="text-center" scope="row">{usuario.DNI}</th>
                                    <td className="text-center">{usuario.Nombre}</td>
                                    <td className="text-center">{usuario.Apellido}</td>
                                    <td className="text-center">{usuario.FechaUltimaEntrada.toISOString()}</td>
                                    <td className="text-center">{usuario.FechaUltimaSalida.toISOString()}</td>
                                    <td className="text-center">
                                        {
                                            usuario.EstaEnOficina ? <Icon.CheckCircle color="green" /> : <Icon.XCircle color="red" />
                                        }
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
                        })
                    }
                </tbody>
            </table>
            {
                datosModal.show
                    ? <EditarUsuariosModal idUsuario={datosModal.id} showModal={true} onCloseModal={function () {
                        setRefresh({});
                        setDatosModal({ id: "", show: false })
                    }} /> : <></>
            }
        </div>
    );

    async function getListaUsuarios(): Promise<IUserResponse[]> {
        let response = fetch(`http://localhost:55434/listaUsuarios`)
            .then(response => response.json())
            .then(respuesta => respuesta)
        return await (response) as IUserResponse[];
    }

    function borrarUsuario(idUsuario: string) {
        let userRequest: IUserRequest = { Id: idUsuario };
        fetch(`http://localhost:55434/borrarUsuario`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userRequest)
        }).then(response => response.json())
            .then(respuesta => respuesta);

        // Insertamos en el usuario para ejecutar el UseEffect y que se actualice la tabla
        setUsuario(usuario)
        setRefresh({})
    }

    function editarUsuario(idUsuario: string) {
        setDatosModal({
            id: idUsuario,
            show: true
        });
    }

}
export default ListaUsuariosComponent;