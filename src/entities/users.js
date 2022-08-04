import axios from 'axios';

const crearUsuario=(usuario)=>{
   return axios({
                // url is the server URL that will be used for the request
                url: 'usuarios/crearusuario/',
    
                // method is the request method to be used when making the request
                method: 'POST', // default
    
                // baseURL will be prepended to url unless url is absolute.
                // It can be convenient to set baseURL for an instance of axios to pass relative URLs
                // to methods of that instance.
                baseURL: 'https://apiskydelight.herokuapp.com/',
    
    
                // headers are custom headers to be sent
                headers: {"KEY-CLIENT":process.env.REACT_APP_API_KEY},
    
                // params are the URL parameters to be sent with the request
                // Must be a plain object or a URLSearchParams object
                // NOTE: params that are null or undefined are not rendered in the URL.
                // params: {
                //     ID: 12345
                // },
    
                // data is the data to be sent as the request body
                // Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
                // When no transformRequest is set, must be of one of the following types:
                // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
                // - Browser only: FormData, File, Blob
                // - Node only: Stream, Buffer
                data: usuario,
            }
        )
    }
    export{
        crearUsuario
    }