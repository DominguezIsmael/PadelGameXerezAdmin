import React from 'react';
import { Link } from 'react-router-dom';
import { Urlcliente } from '../../assets/servicios/Url';


class EditarCliente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            cliente: {}
        }
    }

    cambioValor = (e) => {
        const state = this.state.cliente;
        state[e.target.name] = e.target.value;
        this.setState({ cliente: state });
    }

    cambioValor2 = (e) => {
        const state = this.state;
        console.log(e.target.checked);
        if (e.target.checked) {
            state.socio = 'S';
        }
        else {
            state.socio = 'N';
        }
        this.setState({ state, errores: [] });
        console.log(this.state);
    }


    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");
        const { id, nombre, apellidos, email, password, socio, nivel, fechanacimiento, telefono } = this.state.cliente;

        var datosEnviar = {
            id: id, nombre: nombre, apellidos: apellidos, email: email,
            password: password, socio: socio, nivel: nivel, fechanacimiento: fechanacimiento, telefono: telefono
        }

        fetch(Urlcliente + "?actualizar", {
            method: "POST",
            body: JSON.stringify(datosEnviar)
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                window.location.href = '/listarCliente';
            })
            .catch(console.log)
    }

    componentDidMount() {
        const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        // console.log(id);

        fetch(Urlcliente + "?consultar=" + id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                this.setState({
                    datosCargados: true,
                    cliente: datosRespuesta[0]
                })
            })
            .catch(console.log)
    }

    render() {

        const { datosCargados, cliente } = this.state

        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        Editar Cliente
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.enviarDatos}>
                            <div className="form-group">
                                <label htmlFor="">Clave: </label>
                                <input type="text" readOnly className="form-control" value={cliente.id} name="id" id="id" aria-describedby="helpId" placeholder="" />
                                <small id="helpId" className="form-text text-muted">Clave </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Nombre:</label>
                                <input required type="text" name="nombre" onChange={this.cambioValor} value={cliente.nombre} id="nombre" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe el nombre del cliente </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Apellidos:</label>
                                <input required type="text" name="apellidos" onChange={this.cambioValor} value={cliente.apellidos} id="apellidos" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe los apellidos del cliente </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Email:</label>
                                <input required type="email" name="email" onChange={this.cambioValor} value={cliente.email} id="email" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe el email del cliente </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Password:</label>
                                <input type="password" name="password" onChange={this.cambioValor} value={this.state.password} id="password" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Escribe la contraseña del cliente </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Socio:</label>
                                <input type="checkbox" name="socio" onChange={this.cambioValor2} value={this.state.socio} id="socio" className="form-check-input" placeholder="" aria-describedby="helpId" size={1} />
                                <small id="helpId" className="invalid-feedback">Marca si es socio o no </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Nivel:</label>
                                <input required type="text" name="nivel" onChange={this.cambioValor} value={cliente.nivel} id="nivel" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe el nivel del cliente </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Fecha de nacimiento:</label>
                                <input required type="date" name="fechanacimiento" onChange={this.cambioValor} value={cliente.fechanacimiento} id="fechanacimiento" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe la fecha de nacimiento del cliente </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Teléfono:</label>
                                <input type="text" name="telefono" onChange={this.cambioValor} value={this.state.telefono} id="telefono" className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="invalid-feedback">Escribe el teléfono del cliente </small>
                            </div>
                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Actualizar cliente</button>
                                <Link to={"/listar"} className="btn btn-primary">Cancelar</Link>
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

export default EditarCliente;