import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout({ setRefresh }) {
  return (
    <div className="App">
      <div className="content">
        <Header setRefresh={setRefresh} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
