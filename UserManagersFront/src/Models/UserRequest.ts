export interface IUserRequest {
	Id: string;
}

export interface IUserCommandRequest extends IUserRequest {
	Nombre: string;
	Apellido: string;
	DNI: string;
}

export interface IUserEntryRequest extends IUserRequest {
	EstaEnOficina: boolean;
}
