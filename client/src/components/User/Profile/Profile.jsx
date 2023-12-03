import React from "react";
import * as userService from "../../../services/userService";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect, useContext, useState } from "react";
import SinglePageHead from "../../SinglePageHead/SingePageHead";
import CreatorCard from "../../Creator/CreatorCard/CreatorCard";
import { NavLink } from "react-router-dom";
import "./Profile.css";


const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  //getting User Data
  useEffect(() => {

    async function getUser() {
      const result = await userService
        .getUser(user.accessToken)
        .then((response) => response.json());


      setUserData(result);
    }
    getUser();
  }, [user.accessToken]);

  console.log(userData);

  return (
    <>
      <SinglePageHead pageInfo={{ name: "My Account", slug: 'profile' }} />
      
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-10 col-md-15 move-right" >
            <div className="card user-card-full ">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-2">
                      <img src={userData.imageUrl} className="img-radius" alt="User-Profile-Image" />
                    </div>
                    <h6 className="f-w-600"></h6>
                    <p>{userData.username}</p>
                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div className="col-sm-8 custom-bg-color">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{userData.email}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Jurisdiction Code</p>
                        <h6 className="text-muted f-w-400">{userData.country}</h6>
                      </div>
                    </div>
                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Full Name</p>
                        <h6 className="text-muted f-w-400">{userData.first_name} {userData.last_name}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Need to update info?</p>
                        
                        <NavLink className="text-muted f-w-400 btn" to="/contact">Contact Us</NavLink>
                      </div>
                    </div>
                    <ul className="social-link list-unstyled m-t-40 m-b-10">
                      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
