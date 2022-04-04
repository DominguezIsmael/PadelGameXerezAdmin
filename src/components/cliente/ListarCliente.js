import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Urlcliente} from '../../assets/servicios/Url';

class ListarCliente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            clientes: []
        }
    }

    borrarRegistros = (id) => {
        fetch(Urlcliente + "?borrar=" + id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                this.cargarDatos();
            })
            .catch(console.log)
    }

    cargarDatos() {
        fetch(Urlcliente)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                this.setState({ datosCargados: true, clientes: datosRespuesta })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarDatos();
        console.log(this.state.clientes)
    }

    render() {

        const { datosCargados, clientes } = this.state

        if (!datosCargados) {
            return (
                <Spinner animation="border" role="status" >
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>);
        }
        else {

            return (
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-success" to={"/crearCliente"}>Agregar nuevo cliente</Link>
                    </div>
                    <div className="card-body">
                        <h4>Lista de clientes</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Socio</th>
                                    <th>Nivel</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Teléfono</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.length > 0 && clientes.map(
                                    (cliente) => (
                                        <tr key={cliente.id}>
                                            <td>{cliente.id}</td>
                                            <td>{cliente.nombre}</td>
                                            <td>{cliente.apellidos}</td>
                                            <td>{cliente.email}</td>
                                            <td>{cliente.password}</td>
                                            <td>{cliente.socio}</td>
                                            <td>{cliente.nivel}</td>
                                            <td>{cliente.fechanacimiento}</td>
                                            <td>{cliente.telefono}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <Link className="btn btn-warning"
                                                        to={"/editarCliente/" + cliente.id}
                                                    >Editar</Link>
                                                    <button type="button" className="btn btn-danger"
                                                        onClick={() => this.borrarRegistros(cliente.id)}
                                                    >Borrar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">

                    </div>
                </div>

            );
        }
    }
}

export default ListarCliente;