import React, { useState, useEffect } from "react";
import { Urllogin } from "../assets/servicios/Url";


const Login = () => {


    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const [usuario, setUsuario] = useState(null)
    const [existe, setExiste] = useState(true);


    const loginUsuario = (e) => {
        fetch(Urllogin + '?email=' + email + '&password=' + pass)

            .then((r) =>
                r.json()
            )

            .then(data => {
                if (data.success === 0) { alert("Email o password incorrectos.");
                setExiste(false)
            }
                else { console.log(data) 
                setExiste(true)
                setUsuario(data)
                }
            })

            .catch(err => {
                console.log(err)
            })
     }

    return (
        <div className="row mt-3 ml-4 mr-4">
            <div className="col-lg-4 col-md-3 col-sm-2" />
            <div className="col">
                <form className="form-group mb4">
                    <input onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" type="email" className="form-control" />
                    <input onChange={(e) => { setPass(e.target.value) }} placeholder="Contraseña" type="password" className="form-control mt-4" />
                </form>
                <button onClick={loginUsuario} className="btn btn-success btn-block mb-4">INICIAR SESIÓN</button>
                {
                    !existe ?
                        (
                            <div className="alert-danger text-center">{"Email o password incorrectos."}</div>
                        ) :
                        (
                            <span />
                        )
                }
            </div>
            <div className="col-lg-4 col-md-3 col-sm-2" />
        </div>
    )
}

export default Login;