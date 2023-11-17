import SinglePageHead from "../../SinglePageHead/SingePageHead";
//import SingleClassCard from "../SingleClassCard/SingleClassCard";
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect} from "react";
import * as nftService from "../../../services/nftService";
import SingleNFTCard from "../SingleNFTCard/SingleNFTCard";


import './AllNFTs.css'

//import * as classService from '../../../services/classService';

let initialState = []

const AllNFTs = () => {
    
	const [allNFTs, setAllNFTs] = useState([]);
	//const [activeFilter, setActiveFilter] = useState('');
    
    useEffect( ()=>{

	 async function getAllNFTs() {
			const result = await nftService.getAll();
			initialState = [...result]
            setAllNFTs(result);
 	}
    
     getAllNFTs()

	 },[])

    //TODO FILTERS

	return (
		<>
		<SinglePageHead pageInfo={{name:'NFTs', slug:'allnfts' }} />
		<div className="about wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-7">
                        <div className="nft-img">
                            <img src="./img/nft.png" alt="NFT Image" />
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6">
                        <div className="section-header text-left classes-header-text">
                            <p>Learn About NFTs</p>
                            <h2>What are NFTs?</h2>
                        </div>
                        <div className="about-text">
                            <p>
							Non-fungible tokens (NFTs) are assets that have been tokenized via a blockchain. They are assigned unique identification codes and metadata that distinguish them from other tokens.
                            </p>
                            <p>
							Unleash the power of your creativity by crafting your first Non-Fungible Token (NFT) with us or check out other creator's digital art! Join the NFT wave today, and witness your creativity unfold in the esteemed realm of digital ownership.
                            </p>
                            <Link className="btn" to="/creators">Meet the Creators</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
		 <div className="class" style={{marginTop: '100px'}}>
            <div className="container">
                <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                    <p>Our NFTs</p>
                    <h2>NFTs created on our platform</h2>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul id="class-filter">
                       <li>	<NavLink exact="true" to="/all" data-filter="*"  className="filter-classes-navlink"  >All Blockhains</NavLink> </li>
                            <li> <NavLink to="/balance" data-filter=".filter-1"  className="filter-classes-navlink"  > Ethereum </NavLink></li>
                            <li> <NavLink to="/hatha" data-filter=".filter-2"  className="filter-classes-navlink"  > Solana </NavLink></li>
                            <li> <NavLink to="/children" data-filter=".filter-3"  className="filter-classes-navlink" > Polygon </NavLink></li>
                            <li> <NavLink to="/dance" data-filter=".filter-4" className="filter-classes-navlink" > BNB </NavLink></li>
                        </ul>
                    </div>
                </div>
                
				{allNFTs.length > 0 ? (
                <div className="row class-container">

				{ allNFTs.map(n => <SingleNFTCard key = {n._id} nftData={n} cardId={n._id}/>) }

			 </div> )
			 : 
			 <h4 className="no-NFTs-found">No NFTs found.</h4>} 

            </div>
        </div>
		</>
	)
}

export default AllNFTs;