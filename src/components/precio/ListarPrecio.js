import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Urlprecio} from '../../assets/servicios/Url';

class ListarPrecio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            precios: []
        }
    }

    borrarRegistros = (id) => {
        fetch(Urlprecio + "?borrar=" + id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                this.cargarDatos();
            })
            .catch(console.log)
    }

    cargarDatos() {
        fetch(Urlprecio)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                this.setState({ datosCargados: true, precios: datosRespuesta })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarDatos();
        console.log(this.state.precios)
    }

    render() {

        const { datosCargados, precios } = this.state

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
                        <Link className="btn btn-success" to={"/crearprecio"}>Agregar nuevo precio</Link>
                    </div>
                    <div className="card-body">
                        <h4>Lista de precios</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Día</th>
                                    <th>Precio normal</th>
                                    <th>Precio socio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {precios.length > 0 && precios.map(
                                    (precio) => (
                                        <tr key={precio.id}>
                                            <td>{precio.id}</td>
                                            <td>{precio.dia}</td>
                                            <td>{precio.precio_normal}</td>
                                            <td>{precio.precio_socio}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <Link className="btn btn-warning"
                                                        to={"/editarPrecio/" + precio.id}
                                                    >Editar</Link>
                                                    <button type="button" className="btn btn-danger"
                                                        onClick={() => this.borrarRegistros(precio.id)}
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

export default ListarPrecio;