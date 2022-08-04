import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Forgot from "./views/Forgot";
import Change from "./views/Change";
import Dashboard from "./views/Dashboard";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/change" element={<Change />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
