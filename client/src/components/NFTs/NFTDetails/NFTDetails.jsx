import React from 'react';
import { NavLink } from "react-router-dom";
import SinglePageHead from "../../SinglePageHead/SingePageHead";
import * as nftService from '../../../services/nftService';
import * as userService from '../../../services/userService';
import { useState, useEffect, useContext } from "react";

//todo
import './NFTDetails.css';


const NFTDetails = ({ nftData  }) => {

  console.log("Hello from NFT Details!");

    return () => {
        <>
      <SinglePageHead
        pageInfo={{ name: nftData.name, slug: `/crypto` }}
      />

     </>
    }
}


export default NFTDetails;