import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import SinglePageHead from "../../SinglePageHead/SingePageHead";
import * as nftService from "../../../services/nftService";
import * as userService from "../../../services/userService";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NftContext } from "../../../context/NftContext";
import * as commentService from "../../../services/commentService";

//todo
import "./NFTDetails.css";

const NFTDetails = () => {

  const { addComment, selectNft, nftRemove, fetchNftDetails } = useContext(NftContext);
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

        fetchNftDetails(nftId, { ...nftDetails, comments: nftComments.map(x => `${x.user.username}: ${x.text}`) });

      } catch (err) {

        console.log(`There was an error with getting the single NFT ${err}`);
      }
    })();
  }, []);

  //Comment Func
  const addCommentHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const comment = formData.get('comment');

    try {

      addComment(nftId, comment);

      await commentService.create(nftId, comment);

      const nftDetails = await nftService.getOne(nftId);
      const nftComments = await commentService.getNftById(nftId);
      fetchNftDetails(nftId, { ...nftDetails, comments: nftComments.map(x => `${x.user.username}: ${x.text}`) });

    } catch (err) {

      console.log(`There was an error submiting the comment: ${err}`);

    };

  };


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


  return (
    <>
      <SinglePageHead
        pageInfo={{
          name: `${currentNft.name}`,
          slug: `nft-details/${currentNft._id}`,
        }}
      />

      <div className="single">
        <div className="container">
          <div className="row details-row">
            <div className="col-lg-8">
              <div className="single-content wow fadeInUp">
                <img src={currentNft.imageUrl} />
                <h2>{currentNft.name}</h2>
                <p>{currentNft.description}</p>
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
                        <strong>Created By: </strong> {currentNft.creatorName}
                      </li>
                      <li>
                        <strong>Blockchain: </strong> {currentNft.type}
                      </li>
                      <li>
                        <strong>Price: </strong> {currentNft.price}
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
                ) : null}

                {/* PREVIEW COMMENTS SECTION  */}

                <div className="details-comments">
                  <h2>Comments:</h2>
                  <ul>
                    {currentNft.comments?.map((comment, index) => {
                      const parts = comment.split(':');

                      if (parts.length === 2) {
                        const username = parts[0].trim();
                        const text = parts[1].trim();

                        if (username && text) {
                          return (
                            <li key={index} className="comment">
                              <p>
                                <strong>{username}</strong>: {text}
                              </p>
                            </li>
                          );
                        }
                      }
                      return null;
                    })}
                  </ul>
                  {!currentNft.comments &&
                    <p className="no-comment">No comments.</p>
                  }
                </div>

                {/* ADD COMMENT SECTION  */}
                <article className="create-comment">
                  <label>Add new comment:</label>
                  <form className="form" onSubmit={addCommentHandler}>
                    <textarea
                      name="comment"
                      placeholder="Comment......"
                    />
                    <input
                      className="btn submit"
                      type="submit"
                      value="Add Comment"
                    />
                  </form>
                </article>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTDetails;
