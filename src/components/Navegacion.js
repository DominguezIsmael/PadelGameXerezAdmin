import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/images/logoPadel.png';
import ListarCliente from './cliente/ListarCliente';
import CrearCliente from './cliente/CrearCliente';
import EditarCliente from './cliente/EditarCliente';
import Home from './Home';

class Navegacion extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#17263d" }}>
                        <img
                            src={logo}
                            width="70"
                            height="53"
                            className="d-inline-block align-top"
                            alt="logoPadel"
                            style={{ marginLeft: "25px" }}
                        />
                        <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                            aria-expanded="false" aria-label="Toggle navigation"></button>
                        <div className="collapse navbar-collapse" id="collapsibleNavId" style={{ marginLeft: "50px", fontWeight: "bold" }}>
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <Link className="nav-link" to={"/"}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/listarCliente"}>Listar Clientes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/listarPrecios"}>Listar Precios</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/listarCliente' element={<ListarCliente />} />
                        <Route path='/crearCliente' element={<CrearCliente />} />
                        <Route path='/editarCliente/:id' element={<EditarCliente />} />

                    </Routes>
                </BrowserRouter>
                
            </>
        );
    }

}


export default Navegacion;