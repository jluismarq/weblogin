import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Forgot from "./Forgot";
// import Change from "./Change";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import UpdatePassword from "./UpdatePassword";
import { useAuth } from "../hooks/useAuth";

const RoutesView = () => {
  
  const user = useAuth();

  const renderStart = () => {
    console.log("renderStart");
    return(
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" title="Inicio de sesión" element={<Login />}></Route>
        <Route path="/signup" title="Registro" element={<SignUp />}></Route>
        <Route path="/forgot" title="¿Ólvido su contraseña?" element={<Forgot />}></Route>
      </Routes>
    );
  };

  const renderUserMenu = () => {
    console.log("renderUserMenu");
    return(
      <Routes>
        <Route path="/"  title="Dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" title="Perfil" element={<Profile />}></Route>
        <Route path="/updatepassword" title="Cambio de contraseña" element={<UpdatePassword />}></Route>
      </Routes>
    );
  };

  return(
    <>
    {!user?.user? renderStart() : renderUserMenu()}
    </>
  )
}

export default RoutesView