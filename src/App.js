import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Forgot from "./views/Forgot";
import Change from "./views/Change";
import Dashboard from "./views/Dashboard";
import Hola from "./views/Hola";
import BarraSuperior from "./components/BarraSuperior";
import Start from "./views/Start";
import { Auth } from "./hooks/Auth";

function App() {
  const user = Auth();

  const renderStart = () => {
    return (
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
    return (
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/hola" element={<Hola />}></Route>
      </Routes>
    );
  };

  return (
    <div>
      <BarraSuperior />
      {!user.isAuth ? renderStart() : renderUserMenu()}
    </div>
  );
}

export default App;
