import axios from 'axios';

const token=(usuario)=>{
    return axios({
        url:'usuarios/token/obtener/',
        method:'POST',
        baseURL: process.env.REACT_APP_BACKEND,
        data:usuario,
    })
}


const crearUsuario=(usuario)=>{
   return axios({
                url: 'usuarios/crearusuario/',
                method: 'POST', // default
                baseURL: process.env.REACT_APP_BACKEND,
                headers: {"KEY-CLIENT":process.env.REACT_APP_API_KEY},
                data: usuario,
            }
        )
}

const recuperarPassword=(usuario)=>{
    return axios({
                url: 'usuarios/recuperar-contraseña/',
                method: 'POST', 
                baseURL: process.env.REACT_APP_BACKEND,
                headers: {"KEY-CLIENT":process.env.REACT_APP_API_KEY},
                data: usuario,
            }
        )
}
    
const cambiarPassword=(usuario)=>{
    return axios({
                url: 'usuarios/cambiar-contrasena/',
                method: 'PUT', 
                baseURL: process.env.REACT_APP_BACKEND,
                headers: {
                    "KEY-CLIENT":process.env.REACT_APP_API_KEY,
                    "Authorization": `Bearer ${usuario.access}` 
                },
                data: usuario,
                }
        )
}

const actualizarUsuario=(usuario)=>{
    return axios({
                url: 'usuarios/actualizar-informacion/',
                method: 'PUT', 
                baseURL: process.env.REACT_APP_BACKEND,
                headers: {
                    "KEY-CLIENT":process.env.REACT_APP_API_KEY,
                    "Authorization": `Bearer ${usuario.access}` 
                },
                data: usuario,
                }
        )
}

const eliminarUsuario=(usuario)=>{
    return axios({
                url: 'usuarios/eliminar-usuario/',
                method: 'PUT', 
                baseURL: process.env.REACT_APP_BACKEND,
                headers: {
                    "KEY-CLIENT":process.env.REACT_APP_API_KEY,
                    "Authorization": `Bearer ${usuario.access}` 
                },
                data: usuario,
                }
        )
}

    export{
        crearUsuario,
        recuperarPassword,
        cambiarPassword,
        token,
        actualizarUsuario,
        eliminarUsuario
    }