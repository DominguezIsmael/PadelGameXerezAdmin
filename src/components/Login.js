import React, { useState } from "react";
import { Urllogin } from "../assets/servicios/Url";

const Login = () => {

    const [pass, setPass] = useState("")
    const [usuario, setUsuario] = useState(null)
    const [existe, setExiste] = useState(false);


    const loginUsuario = (e) => {
        fetch(Urllogin + '?usuario=' + usuario + '&password=' + pass)

            .then((r) =>
                r.json()
            )

            .then(data => {
                if (data.success === 0) {
                    alert("Usuario o password incorrectos.");
                    setExiste(false)
                }
                else {
                    console.log(data)
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
                {
                    !existe ?
                        (
                            <>
                                <form className="form-group mb4">
                                    <input onChange={(e) => { setUsuario(e.target.value) }} placeholder="Usuario" type="text" className="form-control" />
                                    <input onChange={(e) => { setPass(e.target.value) }} placeholder="Contraseña" type="password" className="form-control mt-4" />
                                </form>
                                <button onClick={loginUsuario} className="btn btn-success btn-block mb-4">INICIAR SESIÓN</button>
                            </>

                        ) :
                        (
                            <h2>Bienvenido al apartado de administración</h2>
                        )
                }
            </div>
            <div className="col-lg-4 col-md-3 col-sm-2" />
        </div>
    )
}

export default Login;