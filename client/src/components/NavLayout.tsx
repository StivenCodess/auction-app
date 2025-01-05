import { NavLink } from "react-router-dom";

import { useAuthStore } from "../hooks";
import { NavLayoutCSS } from "../styles";
import LogoutRounded from "./icons/LogoutRounded";

const NavLayout = () => {
  const { status, startLogout } = useAuthStore();

  return (
    <header className={NavLayoutCSS.header__container}>
      <h1>AuctionAPP</h1>
      <nav>
        {status === "not-authenticated" ? (
          <>
            <NavLink to={"auth/login"}>Login</NavLink>
            <NavLink to={"auth/register"}>Register</NavLink>
          </>
        ) : (
          <button onClick={startLogout}>
            <LogoutRounded />
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default NavLayout;
