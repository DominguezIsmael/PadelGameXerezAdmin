import React from 'react';
import { Link } from 'react-router-dom';
import { Urlprecio } from '../../assets/servicios/Url';


class EditarPrecio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            precio: {}
        }
    }

    cambioValor = (e) => {
        const state = this.state.precio;
        state[e.target.name] = e.target.value;
        this.setState({ precio: state });
    }


    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");
        const { id, dia, precio_normal, precio_socio } = this.state.precio;

        var datosEnviar = {
            id: id, dia: dia, precio_normal: precio_normal, precio_socio: precio_socio
        }
        console.log(datosEnviar)
        fetch(Urlprecio + "?actualizar", {
            method: "POST",
            body: JSON.stringify(datosEnviar)
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                window.location.href = '/listarPrecio';
            })
            .catch(console.log)
    }

    componentDidMount() {
        const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        // console.log(id);

        fetch(Urlprecio + "?consultar=" + id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                this.setState({
                    datosCargados: true,
                    precio: datosRespuesta[0]
                })
            })
            .catch(console.log)
    }

    render() {

        const { datosCargados, precio } = this.state;

        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        Editar Precio
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.enviarDatos}>
                            <div className="form-group">
                                <label htmlFor="">Día:</label>
                                <input type="text" readOnly name="dia" onChange={this.cambioValor} value={precio.dia} id="dia" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Escribe "Entre semana" o "Fin de semana" </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Precio normal:</label>
                                <input type="number" name="precio_normal" onChange={this.cambioValor} value={precio.precio_normal} id="precio_normal" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Escribe el precio general</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Precio socio:</label>
                                <input type="number" name="precio_socio" onChange={this.cambioValor} value={precio.precio_socio} id="precio_normal" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Escribe el precio para un socio</small>
                            </div>

                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Actualizar cliente</button>
                                <Link to={"/listarPrecio"} className="btn btn-primary">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-muted">
                        Footer
                    </div>
                </div>
            );
        }
    }
}

export default EditarPrecio;