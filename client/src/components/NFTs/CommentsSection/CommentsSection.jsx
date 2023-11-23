import React from "react";
import * as nftService from "../../../services/nftService";
import * as commentService from "../../../services/commentService";
import { NftContext } from "../../../context/NftContext";
import { useContext } from "react";
import { timeNow } from "../../common/timeNow";

import "./CommentsSection.css";

const CommentsSection = ({ currentNft, addComment }) => {
  const { fetchNftDetails } = useContext(NftContext);
  const currentTime = timeNow();

  // Comment Func
  const addCommentHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const comment = formData.get("comment");

    
    try {
      addComment(currentNft._id, comment);

      await commentService.create(currentNft._id, comment);

      const nftDetails = await nftService.getOne(currentNft._id);
      const nftComments = await commentService.getNftById(currentNft._id);

      fetchNftDetails(currentNft._id, { ...nftDetails, comments: nftComments.map(x => `${x.user.username}: ${x.text}`) });

    } catch (err) {
      
      console.log(`There was an error submitting the comment: ${err}`);
    }
  };

  return (
    <>
      {/* PREVIEW COMMENTS SECTION */}

      <div className="container mt-1">
        <div className="row">
          <div className="col-md-12">
            <ul className="list-unstyled">
              Comments
            </ul>
          </div>
        </div>
      </div>

      {/* Add comment */}
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

      {/* All comments */}

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <ul className="list-unstyled ">
              {currentNft.comments?.map((comment, index) => {
                const parts = comment.split(':');

                if (parts.length === 2) {
                  const username = parts[0].trim();
                  const text = parts[1].trim();

                  if (username && text) {
                    return (
                      <li key={index} className="comment">
                        <div className="media-body d-flex align-items-center">
                          <img
                            src="https://img.icons8.com/bubbles/100/000000/couple-icloud.png"
                            className="align-self-start mr-3 rounded-circle"
                            alt=""
                            style={{ width: '60px', height: '60px' }}
                          />
                          <div className="media-body">
                            <div className="row d-flex align-items-center">
                              <h6 className="user pt-2">{username}</h6>
                              <div className="ml-auto " style={{ marginRight: '40px', marginTop: '1px' }}>
                                <p className="text">{currentTime}</p>
                              </div>
                            </div>
                            <p className="text">{text}</p>
                          </div>
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsSection;




        
        {/* {!currentNft.comments && <p className="no-comment">No comments.</p>}
      </div> */}