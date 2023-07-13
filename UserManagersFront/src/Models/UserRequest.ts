export interface IUserCommandRequest extends IUserRequest {
	Nombre: string;
	Apellido: string;
	DNI: string;
}

export interface IUserEntryRequest extends IUserRequest {
	EstaEnOficina: boolean;
}


export interface IUserRequest{
	Id: string;
}
