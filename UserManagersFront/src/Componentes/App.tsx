import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AñadirUsuarios from "./AñadirUsuarios/AñadirUsuarios";
import ListaUsuariosComponent from "./ListaUsuarios/ListaUsuariosComponent";
import NavBarComponent from "./NavBar/NavBarComponent";
import RegistroEntradaSalidaComponent from "./RegistroEntradaSalida/RegistrarEntradaSalidaComponent";

function App() {
	return (
		<div className="App">
			<Router>
				<NavBarComponent />
				<Routes>
					<Route path="/" element={<RegistroEntradaSalidaComponent />} />
					<Route path="/listaUsuarios" element={<ListaUsuariosComponent />} />
					<Route path="/crearUsuarios" element={<AñadirUsuarios />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
