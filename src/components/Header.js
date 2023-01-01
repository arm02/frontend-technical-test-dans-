import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ setRefresh }) => {
  const navigate = useNavigate();
  const [hooks, setHooks] = useState(true);
  const validateLogin = () => {
    setHooks(false);
    if (!localStorage.getItem('token')) {
      return navigate('/login');
    }

    if (localStorage.getItem('token') && window.location.pathname === '/login') {
      return navigate('/');
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    return navigate('/login');
  }

  useEffect(() => {
    if(hooks) {
      validateLogin();
    }
  }, [hooks, setHooks]);
  return (
    <>
      <div id="todo-header" className="header">
        <div>
          <b>GitHub</b> Jobs
        </div>
        {window.location.pathname !== '/login' &&
         <button className="logout-button" onClick={logout}>Logout</button>
        }
      </div>
    </>
  );
};

export default Header;
