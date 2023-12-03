import React from "react";
import * as nftService from "../../../services/nftService";
import * as commentService from "../../../services/commentService";
import { NftContext } from "../../../context/NftContext";
import { useContext } from "react";
import { timeNow } from "../../common/timeNow";
import { AuthContext } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";

import "./CommentsSection.css";


const CommentsSection = ({ currentNft, addComment }) => {
  const { fetchNftDetails } = useContext(NftContext);
  
  const { user, isAuthenticated } = useContext(AuthContext);

  // Comment Func
  const addCommentHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const comment = formData.get("comment");
    const currentTime = timeNow();
    const image = user.imageUrl;

    try {

      addComment(currentNft._id, { username: user.username, text: comment, timestamp: currentTime, image: image });

      await commentService.create(currentNft._id, comment, currentTime, image);

      
      const nftDetails = await nftService.getOne(currentNft._id);
      const nftComments = await commentService.getNftById(currentNft._id);

      fetchNftDetails(currentNft._id, {
        ...nftDetails,
        comments: nftComments.map(x => `user: ${x.user.username} / text: "${x.text}" / timestamp: ${x.timestamp} / image: ${x.image}`),
    });
    } catch (err) {

      console.log(`There was an error submitting the comment: ${err}`);
    }
  };

  return (
    <>
      {/* PREVIEW COMMENTS SECTION */}
      <div className="comments-section-container">
        <div className="container mt-1">
          <div className="row">
            <div className="col-md-12">
              <ul className="list-unstyled">
                <div className="seven">
                  <h1>Comments</h1>
                </div>
              </ul>
            </div>
          </div>
        </div>

        {/* Add comment */}

        {isAuthenticated ? (  
        <article className="create-comment ml-3">
          <label className="comment-label">Add new comment:</label>
          <form className="comment-form" onSubmit={addCommentHandler}>
            <textarea
              name="comment"
              placeholder="Write your comment..."
              className="comment-textarea"
              style={{ height: '60px' }}
            />
            <button type="submit" className="btn submit comment-btn">
              Add Comment
            </button>
          </form>
        </article>
          ): (
            <div className="comment-login">
            <NavLink to="/login" className="login-link-log" align="center">
            To comment, please sign in. <strong>Click here!</strong>
            </NavLink>
            </div>
          )}

        {/* All comments */}
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-12">
              <ul className="list-unstyled">

                {console.log(currentNft.comments)}
                {currentNft.comments?.length > 0 ? (
                  currentNft.comments.map((comment, index) => {
                  
                        return (
                          <li key={index} className="comment">
                            <div className="media-body d-flex align-items-center">
                              <img
                                src={comment.image}
                                className="align-self-start mr-3 rounded-circle"
                                alt=""
                                style={{ width: '60px', height: '60px' }}
                              />
                              <div className="media-body">
                                <div className="row d-flex align-items-center">
                                  <h6 className="user pt-2">{comment.username}</h6>
                                  <div className="ml-auto" style={{ marginRight: '40px', marginTop: '1px' }}>
                                  <p className="text">{comment.timestamp}</p>
                                  </div>
                                </div>
                                <p className="text">{comment.text}</p>
                              </div>
                            </div>
                          </li>
                        );
                  })
                ) : (
                  <p className="no-comment">No comments.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsSection;