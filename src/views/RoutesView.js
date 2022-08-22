import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Forgot from "./Forgot";
import Change from "./Change";
import Dashboard from "./Dashboard";
import Hola from "./Hola";
import Start from "./Start";
import Profile from "./Profile";
import { useAuth } from "../hooks/useAuth";

const RoutesView = () => {
  
  const user = useAuth();

  const renderStart = () => {
    console.log("renderStart");
    return(
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/change" element={<Change />}></Route>
      </Routes>
    );
  };

  const renderUserMenu = () => {
    console.log("renderUserMenu");
    return(
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/hola" element={<Hola />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
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