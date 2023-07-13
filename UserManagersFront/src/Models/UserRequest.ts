export interface IUserCommandRequest extends IUserRequest {
	Nombre: string;
	Apellido: string;
	DNI: string;
	FechaUltimaEntrada: Date;
	FechaUltimaSalida: Date;
	EstaEnOficina: boolean;
}

export interface IUserRequest{
	Id: string;
}
