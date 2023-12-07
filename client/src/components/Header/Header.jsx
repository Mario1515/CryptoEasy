// Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import { useAuthContext } from "../../context/AuthContext";

import "./Header.css"; 

const Header = () => {
  const { user, isAuthenticated } = useAuthContext();

  if(user.username){

  } else {
    console.log("User is not authenticated");
  }

  return (
    <>
      <div className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <div className="container-fluid">
          <NavLink to="/" className="logo">
            <img src={logoSvg} alt="CryptoEasy" className="logo-btc" />
            <span>Crypto Easy</span>
          </NavLink>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav ml-auto">
              <NavLink to="/" exact="true" className="nav-item nav-link">
                Home
              </NavLink>
              <NavLink to="/crypto" className="nav-item nav-link">
                Crypto
              </NavLink>
              <NavLink to="/allnfts" className="nav-item nav-link">
                    NFT
              </NavLink>

              {!isAuthenticated ? (
                <>
                  <NavLink to="/login" className="nav-item nav-link">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="nav-item nav-link">
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/createnft" className="nav-item nav-link">
                    Create NFT
                  </NavLink>
                  <NavLink to="/profile" className="nav-item nav-link">
                    Profile
                  </NavLink>
                  <NavLink to="/logout" className="nav-item nav-link">
                    Logout
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
        {user.username ? (<div className="welcome-user">Welcome, {user.username}!</div>) : (<div className="welcome-user">Welcome, Guest!</div>)}
      </div>
    </>
  );
};

export default Header;
