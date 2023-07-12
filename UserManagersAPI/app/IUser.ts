import { type Document } from 'mongoose';

export interface IUser extends Document {
  Nombre: string;
  Apellido: string;
  DNI: string;
  FechaUltimaEntrada: Date;
  FechaUltimaSalida: Date;
  EstaEnOficina: boolean;
}
