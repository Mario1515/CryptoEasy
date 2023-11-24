import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import SinglePageHead from "../../SinglePageHead/SingePageHead";
import * as nftService from "../../../services/nftService";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NftContext } from "../../../context/NftContext";
import * as commentService from "../../../services/commentService";
import CommentsSection from "../CommentsSection/CommentsSection";

//todo
import "./NFTDetails.css";

const NFTDetails = () => {
  const { addComment, selectNft, nftRemove, fetchNftDetails } =
    useContext(NftContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // HANDLING NFT DATA INFO WITH
  const nftId = Object.values(useParams()).toString();
  const currentNft = selectNft(nftId);

  const isOwner = currentNft._ownerId === user._id;

  useEffect(() => {
    (async () => {
      try {
        const nftDetails = await nftService.getOne(nftId);

        const nftComments = await commentService.getNftById(nftId);

        fetchNftDetails(nftId, {
          ...nftDetails,
          comments: nftComments.map((x) => `${x.user.username}: ${x.text}`),
        });
      } catch (err) {
        console.log(`There was an error with getting the single NFT ${err}`);
      }
    })();
  }, []);

  //Delete Func
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

  return (<>
    <SinglePageHead
      pageInfo={{
        name: `${currentNft.name}`,
        slug: `nft-details/${currentNft._id}`,
      }}
    />
  
    {/* Name and Image of NFT */}
    <div className="single">
      <div className="container">
        <div className="row details-row">
          <div className="col-lg-8">
            <div className="single-content wow fadeInUp">
              <img src={currentNft.imageUrl} />
            </div>
  
            {/* NFT details */}
            <div className="nft-details">
              <div className="container mt-3">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="nft-title">
                      <span className="label">NFT Name:</span> {currentNft.name}
                    </h1>{" "}
                    <div className="category-widget">
                      <ul>
                        <li>
                          <span className="created-label">Created By: </span>{" "}
                          {currentNft.creatorName}
                        </li>
                        <li>
                          <span className="blockchain-label">Blockchain: </span>{" "}
                          {currentNft.type}
                        </li>
                        <li>
                          <span className="price-label">Price: </span> $
                          {currentNft.price}
                        </li>
                      </ul>
                    </div>
                    <div className="description-section">
                      <span className="description-label"> Description: </span>{" "}
                      <p>{currentNft.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Buttons for Creator */}
            {/* {isAuthenticated && isOwner ? (
              <div className="author-btns">
                <button className="submit login details">
                  {" "}
                  <NavLink
                    className="btn"
                    to={{
                      pathname: `/edit/${currentNft._id}/edit`,
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
            ) : null} */}
          </div>
  
          {/* Comment Section */}
          <div className="col-lg-4">
            <div className="sidebar">
              <div className="comment-section"></div>
  
              {/* COMMENT SECTION */}
              <CommentsSection
                currentNft={currentNft}
                addComment={addComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default NFTDetails;

