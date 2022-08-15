import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = (userdata) => {
  
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const access = localStorage.getItem("access");

    if (userdata) {
      setUser(userdata);
      localStorage.setItem("access", userdata);
    } else if (access) {
      setUser(access);
    }

  }, [userdata]);

  return {
    user,
    Login: (access) => {
      setUser(access);
      localStorage.setItem("access", access);
      navigate("/hola", { replace: true });
    },
    isAuth: localStorage.getItem("access"),
  };
};

export default Auth;
