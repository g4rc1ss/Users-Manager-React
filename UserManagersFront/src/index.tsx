import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./Componentes/App";
import { LoadConfigurationByEnvironment } from "./config";
import reportWebVitals from "./reportWebVitals";
LoadConfigurationByEnvironment();

const rootElement = document.getElementById("root");
if (!(rootElement instanceof HTMLElement)) {
	throw new Error("No hay elemento root en el index.html");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
