import mongoose from "mongoose";

import { IUserEntity } from "./IUserEntity";

const userSchema = new mongoose.Schema({
	Nombre: String,
	Apellido: String,
	DNI: String,
	FechaUltimaEntrada: Date,
	FechaUltimaSalida: Date,
	EstaEnOficina: Boolean,
});

export const User = mongoose.model<IUserEntity>("Persona", userSchema);
