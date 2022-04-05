import React from 'react';
import { Link } from 'react-router-dom';
import {Urlcliente} from '../../assets/servicios/Url';

class CrearCliente extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            nombre:"",
            apellidos:"",
            email:"",
            password:"",
            socio:"N",
            nivel:"",
            fechanacimiento:"",
            telefono:"",
            errores:[]
         }
    }
    

    cambioValor = (e) =>{
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({state,errores:[]});
        console.log(this.state);
    }

    cambioValor2 = (e) =>{
        const state=this.state;
        console.log(e.target.checked);
        if(e.target.checked)
        {
          state.socio = 'S';
        }
        else{
          state.socio = 'N';
        }
        this.setState({state,errores:[]});
        console.log(this.state);
    }

    verificarError(elemento){
        return this.state.errores.indexOf(elemento) !==-1;
    }
    
    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");

        const{nombre,apellidos,email,password,socio,nivel,fechanacimiento,telefono}=this.state;
        
        var errores=[];
        if(!nombre)errores.push("error_nombre");
        if(!apellidos)errores.push("error_apellido");
        if(!email)errores.push("error_email");
        if(!password)errores.push("error_password");
        // if(!socio)errores.push("error_socio");
        // if(!nivel)errores.push("error_nivel");
        if(!fechanacimiento)errores.push("error_fechanacimiento");
        if(!telefono)errores.push("error_telefono");


        this.setState({errores:errores});
        if(errores.length>0)return false;


        var datosEnviar= {nombre:nombre, apellidos:apellidos, email:email, password:password, socio:socio, nivel:nivel, fechanacimiento:fechanacimiento, telefono:telefono}

        fetch(Urlcliente+"?insertar", {
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
              console.log(datosRespuesta);
                // this.props.history.push("/");
                window.location='./listarCliente';
            })
            .catch(console.log)
    }

    render() { 

       // const{nombre, apellidos, usuario, password, socio, nivel, fechanacimiento}=this.state;


        return ( 
            <div className="card">
                <div className="card-header">
                    Nuevo Cliente
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                        <div className="form-group">
                          <label htmlFor="">Nombre:</label>
                          <input type="text" name="nombre" onChange={this.cambioValor} value={this.state.nombre} id="nombre" className={((this.verificarError("error_nombre"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe el nombre del cliente </small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Apellidos:</label>
                          <input type="text" name="apellidos" onChange={this.cambioValor} value={this.state.apellidos} id="apellidos" className={((this.verificarError("error_apellidos"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe los apellidos del cliente </small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Email:</label>
                          <input type="email" name="email" onChange={this.cambioValor} value={this.state.email} id="email" className={((this.verificarError("error_email"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe el email del cliente </small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Password:</label>
                          <input type="password" name="password" onChange={this.cambioValor} value={this.state.password} id="password" className={((this.verificarError("error_password"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe la contraseña del cliente </small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Socio:</label>
                          <input type="checkbox" name="socio" onChange={this.cambioValor2} value={this.state.socio} id="socio" className={((this.verificarError("error_socio"))?"is-invalid":"")+" form-check-input"} placeholder="" aria-describedby="helpId" size={1}/>
                          <small id="helpId" className="invalid-feedback">Marca si es socio o no </small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Nivel:</label>
                          <input type="text" name="nivel" onChange={this.cambioValor} value={this.state.nivel} id="nivel" className={((this.verificarError("error_nivel"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe el nivel del cliente </small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Fecha de nacimiento:</label>
                          <input type="date" name="fechanacimiento" onChange={this.cambioValor} value={this.state.fechanacimiento} id="fechanacimiento" className={((this.verificarError("error_fechanacimiento"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe la fecha de nacimiento del cliente </small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Teléfono:</label>
                          <input type="text" name="telefono" onChange={this.cambioValor} value={this.state.telefono} id="telefono" className={((this.verificarError("error_telefono"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe el teléfono del cliente </small>
                        </div>
                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Agregar nuevo cliente</button>
                            <Link to={"/listarCliente"} className="btn btn-primary">Cancelar</Link>
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
 
export default CrearCliente;