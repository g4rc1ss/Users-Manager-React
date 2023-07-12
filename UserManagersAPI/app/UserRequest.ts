export interface UserRequest {
	Id: string;
	Nombre: string;
	Apellido: string;
	DNI: string;
	FechaUltimaEntrada: Date;
	FechaUltimaSalida: Date;
	EstaEnOficina: boolean;
}
