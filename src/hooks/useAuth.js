import React, { useState, useEffect, useContext, createContext } from "react";
import { token , crearUsuario } from "../entities/users";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const saveUser = user => {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
  }

  const signin = async (data) => {
    //const abortCont = new AbortController();
    return token(data)
      .then((jsonResponse) => {
        //console.log(jsonResponse);
        saveUser(jsonResponse.data);
      })
      .catch((err) => {
        throw Error(
          "Ha ocurrido un error al autenticarse, intente de nuevo más tarde"
        );
      });
  };

  const signup = async (data) => {
    //const abortCont = new AbortController();
    return crearUsuario(data)
      .then((user) => {
        // saveUser(user.value);
      })
      .catch((err) => {
        throw Error(
            "No se pudo crear el usuario"
          );
      });
  };

  const signout = async () => {
    saveUser(null);
  };


  const updateUser = newuser => {
    let newUserdata ={...user};
    for (const key in newuser) {
      if (newuser[key]) {
        newUserdata[key]=newuser[key];
      }
    }
    localStorage.setItem('user', JSON.stringify(newUserdata));
    setUser(newUserdata);
  };

  const sendPasswordResetEmail = async (email) => {
   
    //aqui la petición de axios para enviar la contraseña
  };

  const confirmPasswordReset = (token, password) => {

    //aqui la petición de axios para cambiar la contraseña
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const storedUser = JSON.parse(userString);
    setUser(storedUser);
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateUser,
  };
}