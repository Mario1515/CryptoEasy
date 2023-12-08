import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {  AuthContext } from "../../../context/AuthContext";
import * as nftService from  "../../../services/nftService"
import Notification from "../../User/Notication/Notification";
import { NftContext } from "../../../context/NftContext";
import { validateNftData } from '/src/components/common/validateNft.js';
import SinglePageHead from "../../SinglePageHead/SingePageHead"

import "./CreateNFT.css"

const CreateNFT = () => {


  //Notification handler
  let errors = []
  let success = [`You have successfully created a NFT! Redirecting in 3, 2, 1..`]
  const initialNotificationState = {type:'', message: []}

  const [notification, setNotification] = useState(initialNotificationState)
	const [showNotification, setShowNotification] = useState(false);
	const closeNotification = () => {
	setShowNotification(false)
	setNotification(initialNotificationState)
  }

  //Edit Logic
  const navigate = useNavigate();
  const { nftAdd } = useContext(NftContext);
  const { user } = useContext(AuthContext);
  const [creatorName, setCreatorName] = useState(user.username);

    async function createNFT(e){
        e.preventDefault();

        const formData = new FormData(e.target);
		    const {name, type, imageUrl, price, description } = Object.fromEntries(formData);

        //validation
        const errors = validateNftData(name, description, price, imageUrl, type);

        if (errors.length > 0 ) {
          setShowNotification(true)
          setNotification({
            type:'error',
            message: errors
          });
          return;
        }

        const nftData = {name, type, imageUrl, price, description, creatorName};

        try {

          const result = await nftService.create(nftData);

          setShowNotification(true)
          setNotification({
            type:'success',
            message: success
          });

          setTimeout(() => {
            nftAdd(result);
            navigate(`/allnfts`)
          }, 2000);

        } catch (err) {
          errors.push(err.message)
          setShowNotification(true)
          setNotification({
          type:'error',
          message: errors	
        });
      }
    }
		
	return (
		<>
		<SinglePageHead pageInfo={{name:"Create NFT", slug: "create"}} />
		<div className="container-register">
    <div className="title sign">Create NFT</div>
	{showNotification==true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification} /> : '' }
    <div className="content">
      <form action="#" method="POST" onSubmit={createNFT}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Name</span>
            <input type="text" name="name" placeholder="Enter your NFT's name" />
          </div>
          <div className="input-box">
            <span className="details">Blockchain</span>
			<select name="type">
				<option value="Ethereum">Ethereum</option>
				<option value="Solana">Solana</option>
				<option value="Polygon">Polygon</option>
				<option value="Bnb">BNB Smart Chain</option>
            </select>
          </div>

          <div className="input-box">
            <span className="details">NFT Image</span>
            <input type="text" name="imageUrl" placeholder="Enter image URL for your NFT" />
          </div>
		  <div className="input-box">
            <span className="details">Price</span>
            <input type="text" name="price" placeholder="Enter your NFT's price" />
          </div>
		  <div className="input-box">
            <span className="details">Description</span>
            <textarea name="description" rows="4" cols="30" placeholder="Add some description about your NFT..." />
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Create NFTs" />
        </div>
      </form>
    </div>
  </div>
</>
	)
}

export default CreateNFT;