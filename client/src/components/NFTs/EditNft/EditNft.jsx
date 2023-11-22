import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SinglePageHead from "../../SinglePageHead/SingePageHead";
import * as nftService from "../../../services/nftService";
import { NftContext } from "../../../context/NftContext";
import Notification from "../../User/Notication/Notification";
import { validateNftData } from "../../common/validateNft";

const EditNft = () => {

  //Notification Handler

  let errors = []
  let success = [`You have successfully edited an NFT! Redirecting...`]
  const initialNotificationState = {type:'', message: []}

  const [notification, setNotification] = useState(initialNotificationState)
	const [showNotification, setShowNotification] = useState(false);
	const closeNotification = () => {
	setShowNotification(false)
	setNotification(initialNotificationState)
  }

  //Edit Logic 
  const [currentNft, setCurrentNft] = useState({});
  const { nftEdit } = useContext(NftContext);
  const { nftId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    nftService.getOne(nftId).then((nftData) => {
      setCurrentNft(nftData);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const nftData = Object.fromEntries(new FormData(e.target));

    const {name, imageUrl, price, type, description } = nftData;

    //Validations
    const errors = validateNftData(name, description, price, imageUrl, type);

    if (errors.length > 0 ) {
			setShowNotification(true)
			setNotification({
				type:'error',
				message: errors
			});
      return;
		}

    try {
        const result = await nftService.edit(nftId, nftData);

        setShowNotification(true)
          setNotification({
            type:'success',
            message: success
          });
          setTimeout(() => {
            nftEdit(nftId, result);
            navigate(`/nft-details/${nftId}`)
          }, 2000);    

      } catch (err) {
           errors.push(err.message)
          setShowNotification(true)
          setNotification({
          type:'error',
          message: errors
      });
    };
  };

  return (
    <>
      <SinglePageHead pageInfo={{ name: "Edit NFT", slug: "edit" }} />

      <div className="container-register">
        <div className="title sign">Edit NFT</div>
        {showNotification==true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification} /> : '' }
        <div className="content">
          <form action="#" method="POST" onSubmit={onSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your NFT's name"
                  defaultValue={currentNft.name}
                />
              </div>
              <div className="input-box">
                <span className="details">Blockchain</span>
                <select name="type" defaultValue={currentNft.type}>
                  <option value="Ethereum">Ethereum</option>
                  <option value="Solana">Solana</option>
                  <option value="Polygon">Polygon</option>
                  <option value="Bnb">BNB Smart Chain</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">NFT Image</span>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Enter image URL for your NFT"
                  defaultValue={currentNft.imageUrl}
                />
              </div>
              <div className="input-box">
                <span className="details">Price</span>
                <input
                  type="text"
                  name="price"
                  placeholder="Enter your NFT's price"
                  defaultValue={currentNft.price}
                />
              </div>
              <div className="input-box">
                <span className="details">Description</span>
                <textarea
                  name="description"
                  rows="4"
                  cols="30"
                  placeholder="Add some description about your NFT..."
                  defaultValue={currentNft.description}
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Edit NFT" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditNft;
