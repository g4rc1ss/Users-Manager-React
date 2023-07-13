import { SetStateAction, useState } from 'react'
import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IUserResponse } from '../../Models/UserResponse';

import './EditarUsuariosComponent.css'


function EditarUsuariosModal(props: { showModal: any; onCloseModal: () => void; idUsuario: string; }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dni, setDni] = useState("");

    const [show, setShow] = useState(props.showModal);
    
    const handleClose = function () {
        setShow(false);
        props.onCloseModal();
    }

    function cambiarNombre(event: { target: { value: SetStateAction<string>; }; }) {
        setNombre(event.target.value)
    }
    function cambiarApellido(event: { target: { value: SetStateAction<string>; }; }) {
        setApellido(event.target.value)
    }
    function cambiarDni(event: { target: { value: SetStateAction<string>; }; }) {
        setDni(event.target.value)
    }

    useEffect(() => {
        async function fetchData() {
            let datosUsuario = await obtenerDatosUsuario(props.idUsuario);
            setNombre(datosUsuario.Nombre);
            setApellido(datosUsuario.Apellido);
            setDni(datosUsuario.DNI);
        }
        fetchData();
    }, [])


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
                    <Button variant="primary" onClick={() => saveChanges(props.idUsuario, nombre, apellido, dni)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

    async function saveChanges(idUsuario: any, nombre: string, apellido: string, dni: string) {
        let response = await fetch(`http://localhost:55434/actualizarUsuario`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Id: idUsuario, Nombre: nombre, Apellido: apellido, DNI: dni })
        })
        handleClose();
    }

    async function obtenerDatosUsuario(idUsuario: string) : Promise<IUserResponse> {
        let response = await fetch(`http://localhost:55434/listaUsuarios?id=${idUsuario}`);
        let respuesta = await response.json();
        return respuesta as IUserResponse;
    }


}
export default EditarUsuariosModal;