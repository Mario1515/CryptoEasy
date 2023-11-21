import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import SinglePageHead from "../../SinglePageHead/SingePageHead";
import * as nftService from "../../../services/nftService";
import * as userService from "../../../services/userService";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NftContext } from "../../../context/NftContext";


//todo
import "./NFTDetails.css";

const NFTDetails = ( ) => {

  const { selectNft, nftRemove, fetchNftDetails } = useContext(NftContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // HANDLING NFT DATA INFO WITH
  const nftId = Object.values(useParams()).toString();
  const [nftDetails, setNftDetails] = useState({});

  useEffect(() => {
    async function getNFT() {
      try {
        const result = await nftService.getOne(nftId);

        setNftDetails(result);

        fetchNftDetails(nftId, {...result});
      } catch (err) {
        console.log(`There was an error with getting the single NFT ${err}`);
      }
    }
    getNFT();
  }, []);

  const nftDeleteHandler = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this NFT? The process is permanent."
    );

    if (confirmation) {
      try {
        await nftService.remove(nftId);
        nftRemove(nftId);
        navigate("/allnfts");
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  //NFT onwer check
  const isOwner = nftDetails._ownerId === user._id;

  return (
    <>
      <SinglePageHead
        pageInfo={{
          name: `${nftDetails.name}`,
          slug: `nft-details/${nftDetails._id}`,
        }}
      />

      <div className="single">
        <div className="container">
          <div className="row details-row">
            <div className="col-lg-8">
              <div className="single-content wow fadeInUp">
                <img src={nftDetails.imageUrl} />
                <h2>{nftDetails.name}</h2>
                <p>{nftDetails.description}</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar">
                <div className="sidebar-widget wow fadeInUp"></div>

                <div className="sidebar-widget wow fadeInUp">
                  <h2 className="widget-title">NFT Details:</h2>
                </div>
                <div className="sidebar-widget wow fadeInUp">
                  <div className="category-widget">
                    <ul>
                      <li>
                        <strong>Created By: </strong> {nftDetails.creatorName}
                      </li>
                      <li>
                        <strong>Blockchain: </strong> {nftDetails.type}
                      </li>
                      <li>
                        <strong>Price: </strong> {nftDetails.price}
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Buttons for Creator */}
                {isAuthenticated && isOwner ? (
                  <div className="author-btns">
                    <button className="submit login details">
                      {" "}
                      <NavLink
                        className="btn"
                        to={{
                          pathname: `/edit/${nftDetails._id}/edit`,
                        }}
                      >
                        EDIT
                      </NavLink>
                    </button>
                    <button className="submit login details">
                      {" "}
                      <NavLink className="btn" onClick={nftDeleteHandler}>
                        DELETE
                      </NavLink>{" "}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTDetails;
