import SinglePageHead from "../../SinglePageHead/SingePageHead";
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect} from "react";
import * as nftService from "../../../services/nftService";
import SingleNFTCard from "../SingleNftCard/SingleNFTCard";
import nftImage from "../../../assets/nft.png";


import './AllNFTs.css'


let initialState = []

const AllNFTs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
	const [allNFTs, setAllNFTs] = useState([]);
	const [activeFilter, setActiveFilter] = useState('');
    
    useEffect( ()=>{

	 async function getAllNFTs() {
        try {
            const result = await nftService.getAll();
            initialState = [...result];
            setAllNFTs(result && Array.isArray(result) ? result : []);
        } catch (error) {

            console.error('Error fetching NFTs:', error);
        }
 	}
    getAllNFTs()

	 },[]);


    // FILTERS

    function showAll(e) {
		e.preventDefault();
		setAllNFTs(initialState)
		setActiveFilter('filter-active-nft')
    }
    function showEthereum(e) {
		e.preventDefault();
		const ethereum = initialState.filter( n => n.type== "Ethereum");
        setAllNFTs(ethereum);
    }
    function showSolana(e) {
		e.preventDefault();
		const solana = initialState.filter( n => n.type== "Solana");
        setAllNFTs(solana);
    }
    function showPolygon(e) {
		e.preventDefault();
		const polygon = initialState.filter( n => n.type== "Polygon");
        setAllNFTs(polygon);
    }
    function showBnb(e) {
		e.preventDefault();
		const bnb = initialState.filter( n => n.type== "Bnb");
        setAllNFTs(bnb);
    }

	return (
		<>
		<SinglePageHead pageInfo={{name:'NFTs', slug:'allnfts' }} />
		<div className="about wow fadeInUp" data-wow-delay="0.1s">
            <div className="container custom" >
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-7">
                        <div className="nft-img">
                            <img src={nftImage} alt="NFT Image" />
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
                            <a className="btn learn" href="https://www.investopedia.com/non-fungible-tokens-nft-5115211" target="_blank" rel="noopener noreferrer">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
		 <div className="class" style={{marginTop: '100px'}}>
            <div className="container">
                <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                    <p>NFTs</p>
                    <h2>NFTs created on our platform</h2>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul id="nft-filter">
                       <li>	<NavLink exact="true" to="/all" data-filter="*"  className="nft-button-filter" onClick={showAll} >All Blockhains</NavLink> </li>
                            <li> <NavLink to="/ethereum" data-filter=".filter-1"  className="nft-button-filter" onClick={showEthereum} > Ethereum </NavLink></li>
                            <li> <NavLink to="/solana" data-filter=".filter-2"  className="nft-button-filter" onClick={showSolana}  > Solana </NavLink></li>
                            <li> <NavLink to="/polygon" data-filter=".filter-3"  className="nft-button-filter" onClick={showPolygon} > Polygon </NavLink></li>
                            <li> <NavLink to="/bnb" data-filter=".filter-4" className="nft-button-filter" onClick={showBnb} > BNB </NavLink></li>
                        </ul>
                    </div>
                </div>
                
				{allNFTs.length > 0 ? (
                <div className="row class-container">

				{ allNFTs.map(n => <SingleNFTCard key = {n._id} nftData={n} cardId={n._id}/>) }

			 </div> )
			 : 
			 <h4 className="no-NFTs-found">No NFTs found.</h4> 
             
                }

            </div>
        </div>
		</>
	)
}

export default AllNFTs;