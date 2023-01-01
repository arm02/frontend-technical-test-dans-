import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HttpRequest from "../core/HttpRequest";

const Login = () => {
  const [body, setBody] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const loginSubmit = async () => {
    const loginBody = body;
    const loginData = await HttpRequest(
      process.env.REACT_APP_BASE_URL,
      "/auth/signin",
      "POST",
      {
        values: loginBody,
      }
    );
    if (loginData.returnValue === 200) {
      localStorage.setItem('token', loginData.object.token);
      navigate('/');
    }
    return loginData;
  };

  const handleChange = (name, event) => {
    const data = { ...body };
    data[name] = event;
    setBody(data);
  };

  return (
    <>
      <div className="login-box">
        <div className="search-input">
          <label className="label-search" htmlFor="fname">
            Username
          </label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder=""
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>
        <div className="search-input">
          <label className="label-search" htmlFor="fname">
            Password
          </label>
          <input
            type="password"
            id="fname"
            name="firstname"
            placeholder=""
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div className="button-login">
          <button onClick={loginSubmit}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
