import SinglePageHead from "../../SinglePageHead/SingePageHead";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import * as userService from "../../../services/userService";
import { NavLink } from "react-router-dom";
import Notification from "../Notication/Notification";

import "./Login.css";

const Login = () => {

  //Notification handling
    let errors = []
    let success = [`Sucessful Login! Redirecting in 3, 2, 1...`]

    const initialNotificationState = {type:'', message: []}

	  const [notification, setNotification] = useState(initialNotificationState)
	  const [showNotification, setShowNotification] = useState(false);
	
    const closeNotification = () => {
	  setShowNotification(false)
	  setNotification(initialNotificationState)
    }


  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async  (e) => {
    e.preventDefault();

    try {
      errors = []
      
      const { email, password } = Object.fromEntries(new FormData(e.target));
      const userData = { email, password };
  
      const authData = await userService.login(userData);
  
      if(authData.code === 403) {
        errors.push('Invalid username or password!')
        setShowNotification(true)
			  setNotification({ type:'error', message: errors});
        return;
      } else {
        userLogin(authData);
        setShowNotification(true)
        setNotification({
          type:'success',
          message: success
        })
  
        setTimeout(() => {navigate("/")}, 2000)
      }

    } catch (error) {

        errors.push(`Unable to process your request, try again later! Error message: ${error}`);
        setShowNotification(true)
			  setNotification({
				type:'error',
				message: errors});
    } 
    
  };

  return (
    <>
      <SinglePageHead pageInfo={{ name: "Login", slug: "login" }} />

      <div className="main">
        <p className="sign" align="center">
          Sign in
        </p>
        {showNotification==true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification} /> : '' }
        <form className="form1" method="POST" onSubmit={onSubmit}>
          <input
            className="un "
            type="text"
            name="email"
            align="center"
            placeholder="email"
          />
          <input
            className="pass"
            type="password"
            name="password"
            align="center"
            placeholder="Password"
          />
          <button type="submit" className="submit login" align="center">
            Sign in
          </button>
          <p className="forgot" align="center"></p>
        </form>
        <NavLink to="/register" className="register-link-log" align="center">
          Not registered yet? <strong>Click here!</strong>
        </NavLink>
      </div>
    </>
  );

};

export default Login;
