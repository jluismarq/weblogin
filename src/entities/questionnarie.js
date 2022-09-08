import axios from 'axios';

const obtenerCuestionario=(usuario)=>{
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

export{
    obtenerCuestionario
}