import express, { type Request, type Response, type NextFunction } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { type IUser } from './IUser'

const app = express()
app.listen(55434)
app.use(express.json())
app.use(cors())

// Tipos de middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware ejecutándose')
  next()
})

app.get('/listaUsuarios', (request: Request, response: Response) => {
  const dniUsuario = request.query.DNI
  const idUsuario = request.query.id?.toString()

  const datoBusqueda = {
    DNI: dniUsuario ?? null,
    _id: idUsuario ?? null
  }

  const users = User.find(datoBusqueda).then(result => result)
  response.json(users)
})

app.post('/crearUsuario', (request, response) => {
  const nombreUsuario = request.body.Nombre
  const apellidoUsuario = request.body.Apellido
  const dniUsuario = request.body.DNI

  const nuevoUsuario = new User({
    Nombre: nombreUsuario,
    Apellido: apellidoUsuario,
    DNI: dniUsuario
  })

  try {
    const saved = nuevoUsuario.save().then(result => result)
    console.log(saved)
    response.json(saved)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      response.send({ mensaje: 'Error: ' + error.message })
    }
  }
})

app.put('/actualizarUsuario', (request, response) => {
  const idUsuario = request.body.Id
  const nombreUsuarioPut = request.body.Nombre
  const apellidoUsuarioPut = request.body.Apellido
  const DNIPut = request.body.DNI
  const estaEnOficina: boolean = request.body.estaEnOficina

  if (idUsuario === undefined) {
    response.send('No hay id de usuario')
  }
  const datosUpdate = new User({})
  if (nombreUsuarioPut !== undefined) {
    datosUpdate.Nombre = nombreUsuarioPut
  }

  if (apellidoUsuarioPut !== undefined) {
    datosUpdate.Apellido = apellidoUsuarioPut
  }

  if (DNIPut !== undefined) {
    datosUpdate.DNI = DNIPut
  }
  if (estaEnOficina !== undefined) {
    datosUpdate.EstaEnOficina = estaEnOficina
    if (estaEnOficina) {
      datosUpdate.FechaUltimaEntrada = new Date()
    } else {
      datosUpdate.FechaUltimaSalida = new Date()
    }
  }

  const updated = User.findByIdAndUpdate(idUsuario, datosUpdate, { new: true }).then(result => result)
  response.json(updated)
})

app.delete('/borrarUsuario', (request, response) => {
  const idUsuario = request.body.Id

  const deleted = User.findByIdAndRemove(idUsuario).then(result => result)
  response.json(deleted)
})

const userSchema = new mongoose.Schema({
  Nombre: String,
  Apellido: String,
  DNI: String,
  FechaUltimaEntrada: Date,
  FechaUltimaSalida: Date,
  EstaEnOficina: Boolean
})
const User = mongoose.model<IUser>('Persona', userSchema)

// conexion Base de Datos
mongoose.connect('mongodb://localhost:27017/Proyecto3').then(result => {
  console.log('Conexión exitosa a MongoDB')
}).catch(error => {
  console.error('Error al conectar a MongoDB:', error)
})
