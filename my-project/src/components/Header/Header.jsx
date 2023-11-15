// Header.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import CryptoWe from "../../assets/NewOne.png"

import "./Header.css"; // Custom styling

const Header = () => {
  return (
    <>


<div className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
<div className="container-fluid">
			<NavLink to="/" className="logo"> 
      <img src={logoSvg} alt="CryptoEasy" className="logo-btc" />
      <span>Crypto Easy</span>
      </NavLink>
			<div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
				<div className="navbar-nav ml-auto">
					<NavLink to="/" exact={true} className="nav-item nav-link" activeClassName="active">Home</NavLink>
					<NavLink to="/crypto" className="nav-item nav-link" activeClassName="active">Crypto</NavLink>
					<NavLink to="/teachers" className="nav-item nav-link" activeClassName="active">Teachers</NavLink>
					<NavLink to="/contact" className="nav-item nav-link" activeClassName="active">Contact</NavLink>

					</div>
          </div>
					</div>
					</div>

</>
  );
};

export default Header;