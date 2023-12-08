import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import Select from "react-select";

import * as userService from "../../../services/userService";
import { validateEmail, validateUrl } from "../../../services/userService";
import { useAuthContext, withAuth } from "../../../context/AuthContext";
import SinglePageHead from "../../SinglePageHead/SingePageHead";
import Notification from "../Notication/Notification";

import "./Register.css"

const Register = ({ auth }) => {

  //Notification handler
  let errors = []
  let success = [`You have successfully registered! Redirecting in 3, 2, 1...`]
  const initialNotificationState = {type:'', message: []}

  const [notification, setNotification] = useState(initialNotificationState)
	const [showNotification, setShowNotification] = useState(false);

  const closeNotification = () => {
    setShowNotification(false)
    setNotification(initialNotificationState)
  }

  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  //Country Selector
  const CountrySelector = () => {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
        });
    }, []);

    return (
      <Select
        options={countries}
        value={selectedCountry}
        onChange={(selectedOption) => setSelectedCountry(selectedOption)}
        name="country"
      />
    );

  };

  const onRegister = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);

    const { username, email, first_name, last_name, password, re_password, imageUrl, country } = Object.fromEntries(formData)

    //Validations

    if (username.toString().length < 3 || username.toString().length > 15) {
			errors.push('Username must be between 3 and 15 characters.')
		}
    if ((first_name.toString().length < 3 || first_name.toString().length > 15) || (last_name.toString().length < 3 ||last_name.toString().length > 15)) {
			errors.push('Both your first and last name must be between 3 and 15 characters.')
		}
    if (password.toString().length < 5 || password.toString().length > 10) {
			errors.push('Password must be between 5 and 10 characters.')
		}
    if (password!==re_password) {
			errors.push('Passwords do not match.')
		}

    if(country === "CA" || country === "CN" || country === "QA"){
      errors.push('We are unable to onboard you due to legal reasons. Please contact us.')
    }
    
    let imageUrlValid = validateUrl(imageUrl);
    if (! imageUrlValid) {
			errors.push('Image URL must be a valid URL.')
		}

    let emailValid = validateEmail(email);
    if (! emailValid) {
			errors.push('Enter a valid email address.')
		}

    if(errors.length) {
			setShowNotification(true)
			setNotification({
				type:'error',
				message: errors
			});
      return;
		}

    const userData = {
      username,
      email,
      first_name,
      last_name,
      password,
      re_password,
      imageUrl,
      country
    }

    try {
      const authData = await userService.register(userData);
    
      setShowNotification(true)
				setNotification({
					type:'success',
					message: success
				});
        setTimeout(() => {
          auth.userLogin(authData);
          navigate("/");
        }, 2000);       
    } catch (err) {
        errors.push(err.message)
        setShowNotification(true)
        setNotification({
        type:'error',
        message: errors
       });
    };
};

  return (

    <>
      <SinglePageHead pageInfo={{ name: 'Register', slug: 'register' }} />
      <div className="container-register">
        <div className="title sign">Registration</div>
        {showNotification==true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification}  /> : '' }
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
                <span className="details avatar">Avatar Url</span>
                <input type="text" name="imageUrl" placeholder="Avatar Image Url" required />
              </div>
              <div className="input-box">
                <span className="details country-label">Jurisdiction</span>
                {CountrySelector()}
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const RegisterWithAuth = withAuth(Register);

export default RegisterWithAuth;