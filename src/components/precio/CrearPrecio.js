import React from 'react';
import { Link } from 'react-router-dom';
import {Urlprecio} from '../../assets/servicios/Url';

class CrearPrecio extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            dia:"",
            precio_normal:"",
            precio_socio:"",
            errores:[]
         }
    }
    

    cambioValor = (e) =>{
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({state,errores:[]});
        console.log(this.state);
    }

    verificarError(elemento){
        return this.state.errores.indexOf(elemento) !==-1;
    }
    
    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");

        const{dia,precio_normal,precio_socio}=this.state;
        
        var errores=[];
        if(dia!=='Entre semana' && dia!=='Fin de semana')errores.push("error_dia");
        if(!precio_normal)errores.push("error_precio_normal");
        if(!precio_socio)errores.push("error_email");
        
        this.setState({errores:errores});
        if(errores.length>0)return false;


        var datosEnviar= {dia:dia, precio_normal:precio_normal, precio_socio:precio_socio}
        console.log(datosEnviar);

        fetch(Urlprecio+"?insertar", {
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
              console.log(datosRespuesta);
                // this.props.history.push("/");
                window.location='./listarPrecio';
            })
            .catch(console.log)
    }

    render() { 

       // const{nombre, apellidos, usuario, password, socio, nivel, fechanacimiento}=this.state;


        return ( 
            <div className="card">
                <div className="card-header">
                    Nuevo Precio
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                        <div className="form-group">
                          <label htmlFor="">Día:</label>
                          <input type="text" name="dia" onChange={this.cambioValor} value={this.state.dia} id="dia" className={((this.verificarError("error_dia"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe "Entre semana" o "Fin de semana" </small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Precio normal:</label>
                          <input type="number" name="precio_normal" onChange={this.cambioValor} value={this.state.precio_normal} id="precio_normal" className={((this.verificarError("error_precio_normal"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe el precio general</small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Precio socio:</label>
                          <input type="number" name="precio_socio" onChange={this.cambioValor} value={this.state.precio_socio} id="precio_normal" className={((this.verificarError("error_precio_socio"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escribe el precio para un socio</small>
                        </div>
                      
                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Agregar nuevo precio</button>
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
 
export default CrearPrecio;