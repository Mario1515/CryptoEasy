import SinglePageHead from "../../SinglePageHead/SingePageHead";

import { useContext } from "react";
import { NavLink } from 'react-router-dom';

import { AuthContext } from "../../../context/AuthContext";
import { login } from "../../../services/userService";

import "./Login.css"


const Login =  () => {

	const onLoginSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            password,
        } = Object.fromEntries(new FormData(e.target));

		const userData = { email, password };

		console.log(`This user is trying to log in ${JSON.stringify(userData)}`);
    };


	return (
		<>
		<SinglePageHead pageInfo={{name:'Login', slug:'login' }}/>
	
		<div className="main">

		<p className="sign" align="center">Sign in</p>
		<form className="form1" method="POST" onSubmit={onLoginSubmit}>
		  <input className="un " type="text" name="email" align="center" placeholder="email" />
		  <input className="pass" type="password" name="password" align="center" placeholder="Password" />
		  <button type="submit" className="submit login" align="center">Sign in</button>
		  <p className="forgot" align="center"></p>
		  </form>
		  <NavLink to="/register" className="register-link-log" align="center">Not registered yet? <strong>Click here!</strong></NavLink>
		</div>
		</>
	)
}
export default Login;