import React from "react";
import ReactDOM from "react-dom";
import "./scss/main.scss";
import App from "./App";
import "./js/server/server";


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
);
