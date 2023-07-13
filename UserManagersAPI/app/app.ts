import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import mongoose, { FilterQuery } from "mongoose";

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
	const users = async () => {
		const userResponse = await User.find();
		response.json(userResponse);
	};

	users().catch((error) => {
		if (error instanceof Error) {
			console.error(error);
			response.send({ mensaje: `Error: ${error.message}` });
		}
	});
});

app.get("/usuario", (request: Request, response: Response) => {
	const dniUsuario = request.query.DNI;
	const idUsuario = request.query.id?.toString();

	const datoBusqueda: FilterQuery<IUserEntity> = {
		$or: [{ _id: idUsuario }, { DNI: dniUsuario }],
	};

	const users = async () => {
		const userResponse = await User.find(datoBusqueda);
		response.json(userResponse);
	};

	users().catch((error) => {
		if (error instanceof Error) {
			console.error(error);
			response.send({ mensaje: `Error: ${error.message}` });
		}
	});
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

	const saved = async () => {
		const userResponseSave = await newUser.save();
		response.json(userResponseSave);
	};

	saved().catch((error) => {
		if (error instanceof Error) {
			console.error(error);
			response.send({ mensaje: `Error: ${error.message}` });
		}
	});
});

app.put("/actualizarUsuario", (request, response) => {
	const datosRequest = request.body as IUserRequest;

	if (datosRequest.DNI === "") {
		response.send("No hay id de usuario");
	}

	if (datosRequest.EstaEnOficina) {
		datosRequest.FechaUltimaEntrada = new Date();
	} else if (datosRequest.EstaEnOficina !== undefined) {
		datosRequest.FechaUltimaSalida = new Date();
	}

	const updated = async () => {
		const userUpdated = await User.findByIdAndUpdate(datosRequest.Id, datosRequest, { new: true });
		response.json(userUpdated);
	};

	updated().catch((error) => {
		if (error instanceof Error) {
			console.error(error);
			response.send({ mensaje: `Error: ${error.message}` });
		}
	});
});

app.delete("/borrarUsuario", (request, response) => {
	const datosRequest = request.body as IUserRequest;

	const deleted = async () => {
		const userResponseSave = await User.findByIdAndRemove(datosRequest.Id);
		response.json(userResponseSave);
	};

	deleted().catch((error) => {
		if (error instanceof Error) {
			console.error(error);
			response.send({ mensaje: `Error: ${error.message}` });
		}
	});
});

// conexion Base de Datos
mongoose.connect("mongodb://localhost:27017/Proyecto3").catch((error) => {
	console.error("Error al conectar a MongoDB:", error);
});

// eslint-disable-next-line no-console
console.log("Aplicacion en Express ejecutandose");
