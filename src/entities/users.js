import axios from 'axios';

const token=(usuario)=>{
    return axios({
        url:'usuarios/token/obtener/',
        method:'POST',
        baseURL: 'https://apiskydelight.herokuapp.com/',
        data:usuario,
    })
}


const crearUsuario=(usuario)=>{
   return axios({
                url: 'usuarios/crearusuario/',
                method: 'POST', // default
                baseURL: 'https://apiskydelight.herokuapp.com/',
                headers: {"KEY-CLIENT":process.env.REACT_APP_API_KEY},
                data: usuario,
            }
        )
}

const recuperarPassword=(usuario)=>{
    return axios({
                url: 'usuarios/recuperar-contraseña/',
                method: 'POST', 
                baseURL: 'https://apiskydelight.herokuapp.com/',
                headers: {"KEY-CLIENT":process.env.REACT_APP_API_KEY},
                data: usuario,
            }
        )
}
    
const cambiarPassword=(usuario)=>{
    return axios({
                url: 'usuarios/cambiar-contrasena/',
                method: 'PUT', 
                baseURL: 'https://apiskydelight.herokuapp.com/',
                headers: {"KEY-CLIENT":process.env.REACT_APP_API_KEY},
                data: usuario,
                }
        )
}


    
    export{
        crearUsuario,
        recuperarPassword,
        cambiarPassword,
        token
    }