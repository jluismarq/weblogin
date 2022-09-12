import axios from 'axios';

const obtenerSISCO=(usuario)=>{
    return axios({
                url: 'api/lista-testcisco-personal/',
                method: 'POST', 
                baseURL: process.env.REACT_APP_BACKEND,
                headers: {
                    "KEY-CLIENT":process.env.REACT_APP_API_KEY,
                    "Authorization": `Bearer ${usuario.access}` 
                },
                data: usuario,
                }
        )
}

const obtenerSVQ=(usuario)=>{
    return axios({
                url: 'api/lista-testsqv-personal/',
                method: 'POST', 
                baseURL: process.env.REACT_APP_BACKEND,
                headers: {
                    "KEY-CLIENT":process.env.REACT_APP_API_KEY,
                    "Authorization": `Bearer ${usuario.access}` 
                },
                data: usuario,
                }
        )
}

const obtenerPSS=(usuario)=>{
    return axios({
                url: 'api/lista-testpss-personal/',
                method: 'POST', 
                baseURL: process.env.REACT_APP_BACKEND,
                headers: {
                    "KEY-CLIENT":process.env.REACT_APP_API_KEY,
                    "Authorization": `Bearer ${usuario.access}` 
                },
                data: usuario,
                }
        )
}

const obtenerSVS=(usuario)=>{
    return axios({
                url: 'api/lista-testpss-personal/',
                method: 'POST', 
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
    obtenerSISCO,
    obtenerSVQ,
    obtenerPSS,
    obtenerSVS
}