import express, { Request, Response, NextFunction } from "express";
import mongoose, { Document, Schema, mongo } from "mongoose";
import cors from "cors";

const app = express();
app.listen(55434);
app.use(express.json())
app.use(cors())


// Tipos de middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware ejecutándose');
  next();
});


app.get('/listaUsuarios', async (request: Request, response: Response) => {
  let dniUsuario = request.query.DNI;
  let idUsuario = request.query.id?.toString();

  let datoBusqueda = {
    DNI: dniUsuario ?? null,
    _id: idUsuario ?? null
  };

  let users = await User.find(datoBusqueda);
  response.json(users);
});

app.post('/crearUsuario', async (request, response) => {
  let nombreUsuario = request.body.Nombre;
  let apellidoUsuario = request.body.Apellido;
  let dniUsuario = request.body.DNI;

  let nuevoUsuario = new User({
    Nombre: nombreUsuario,
    Apellido: apellidoUsuario,
    DNI: dniUsuario
  });

  try {
    let saved = await nuevoUsuario.save();
    console.log(saved);
    response.json(saved)
  } catch (error) {
    console.error(error);
    response.send({ mensaje: "Error: " + error });

  }
});

app.put('/actualizarUsuario', async (request, response) => {
  let idUsuario = request.body.Id;
  let nombreUsuarioPut = request.body.Nombre;
  let apellidoUsuarioPut = request.body.Apellido;
  let DNIPut = request.body.DNI;
  let estaEnOficina = request.body.estaEnOficina;

  if (idUsuario == undefined) {
    response.send("No hay id de usuario")
  }
  let datosUpdate = new User({});
  if (nombreUsuarioPut != undefined) {
    datosUpdate.Nombre = nombreUsuarioPut;
  }

  if (apellidoUsuarioPut != undefined) {
    datosUpdate.Apellido = apellidoUsuarioPut;
  }

  if (DNIPut != undefined) {
    datosUpdate.DNI = DNIPut;
  }
  if (estaEnOficina != undefined) {
    datosUpdate.EstaEnOficina = estaEnOficina;
    if (estaEnOficina) {
      datosUpdate.FechaUltimaEntrada = new Date();
    } else {
      datosUpdate.FechaUltimaSalida = new Date();
    }
  }

  const updated = await User.findByIdAndUpdate(idUsuario, datosUpdate, { new: true });
  response.json(updated);
});


app.delete('/borrarUsuario', async (request, response) => {
  let idUsuario = request.body.Id;

  let db = request.app.locals.db;
  const deleted = await User.findByIdAndRemove(idUsuario);
  response.json(deleted);
});

interface IUser extends Document {
  Nombre: string,
  Apellido: string,
  DNI: string,
  FechaUltimaEntrada: Date,
  FechaUltimaSalida: Date,
  EstaEnOficina: boolean
}
let userSchema = new mongoose.Schema({
  Nombre: String,
  Apellido: String,
  DNI: String,
  FechaUltimaEntrada: Date,
  FechaUltimaSalida: Date,
  EstaEnOficina: Boolean
});
const User = mongoose.model<IUser>('Persona', userSchema)

// conexion Base de Datos
try {
  mongoose.connect("mongodb://localhost:27017/Proyecto3");
  console.log('Conexión exitosa a MongoDB');
} catch (error: any) {
  console.error('Error al conectar a MongoDB:', error);
}

