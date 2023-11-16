import SinglePageHead from "../../SinglePageHead/SingePageHead";
import { register } from "../../../services/userService";
import {  useState } from "react";


import "./Register.css"

const Register = () => {


  const onRegister = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);

    const {username, email, first_name, last_name, password, re_password, user_imageUrl} = Object.fromEntries(formData)

    //validations TODO!

    const userData = {
      username,
      email,
      first_name,
      last_name,
      password,
      re_password,
      user_imageUrl
    }

    try {
    console.log(userData);

    const response = await register(userData);

    console.log(`User successfully creaded with email ${JSON.stringify(response.email)}`)

    } catch (err) {
      console.log(`I received this error on registration: ${err.message}`)
    }
  };

    return (

		<>
	<SinglePageHead pageInfo={{name:'Register', slug:'register'}}/>

   <div className="container-register">
    <div className="title sign">Registration</div>
    <div className="content">
      <form method="POST" onSubmit={onRegister}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Username</span>
            <input type="text" name="username" placeholder="Enter your username" required />
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="text" name="email" placeholder="Enter your email" required />
          </div>
		  <div className="input-box">
            <span className="details">First Name</span>
            <input type="text" name="first_name" placeholder="Enter your first name" required />
          </div>
		  <div className="input-box">
            <span className="details">Last Name</span>
            <input type="text" name="last_name" placeholder="Enter your last name" required />
          </div>

          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" name="password" placeholder="Enter your password" required />
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input type="password" name="re_password" placeholder="Confirm your password" required />
          </div>
		  <div className="input-box">
            <span className="details avatar-label">Avatar Url</span>
            <input type="text" name="user_imageUrl" placeholder="Avatar Image Url" required />
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  </div> 
		</>
  )
}

export default Register;