import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";

import { User } from "./Consts";
import { type IUserEntity } from "./IUserEntity";
import { IUserRequest } from "./IUserRequest";

const app = express();
app.listen(55434);
app.use(express.json());
app.use(cors());

// Tipos de middleware
app.use((req: Request, res: Response, next: NextFunction) => {
	next();
});

app.get("/listaUsuarios", (request: Request, response: Response) => {
	const dniUsuario = request.query.DNI;
	const idUsuario = request.query.id?.toString();

	const datoBusqueda = {
		DNI: dniUsuario ?? null,
		_id: idUsuario ?? null,
	};

	const users = User.find(datoBusqueda).then((result) => result);
	response.json(users);
});

app.post("/crearUsuario", (request, response) => {
	const nuevoUsuario = request.body as IUserRequest;
	const newUser: IUserEntity = new User({
		Nombre: nuevoUsuario.Nombre,
		Apellido: nuevoUsuario.Apellido,
		DNI: nuevoUsuario.DNI,
		FechaUltimaEntrada: nuevoUsuario.FechaUltimaEntrada,
		FechaUltimaSalida: nuevoUsuario.FechaUltimaSalida,
	});

	try {
		const saved = newUser.save().then((result) => result);
		response.json(saved);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error);
			response.send({ mensaje: `Error: ${error.message}` });
		}
	}
});

app.put("/actualizarUsuario", (request, response) => {
	const datosRequest = request.body as IUserRequest;
	const datosUpdate: IUserEntity = new User({
		Nombre: datosRequest.Nombre,
		Apellido: datosRequest.Apellido,
		DNI: datosRequest.DNI,
		FechaUltimaEntrada: datosRequest.FechaUltimaEntrada,
		FechaUltimaSalida: datosRequest.FechaUltimaSalida,
	});

	if (datosUpdate.Nombre === "") {
		response.send("No hay id de usuario");
	}

	if (datosUpdate.EstaEnOficina) {
		datosUpdate.FechaUltimaEntrada = new Date();
	} else {
		datosUpdate.FechaUltimaSalida = new Date();
	}

	const updated = User.findByIdAndUpdate(datosRequest.Id, datosUpdate, { new: true }).then(
		(result) => result
	);
	response.json(updated);
});

app.delete("/borrarUsuario", (request, response) => {
	const datosRequest = request.body as IUserRequest;

	const deleted = User.findByIdAndRemove(datosRequest.Id).then((result) => result);
	response.json(deleted);
});

// conexion Base de Datos
mongoose.connect("mongodb://localhost:27017/Proyecto3").catch((error) => {
	console.error("Error al conectar a MongoDB:", error);
});

// eslint-disable-next-line no-console
console.log("Aplicacion en Express ejecutandose");
