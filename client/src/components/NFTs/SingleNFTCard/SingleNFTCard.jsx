import * as userService from '../../../services/userService'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import "./SingleNFTCard.css"

const SingleNFTCard = ({ nftData }) => {


	// //setting nft creator state
	// const [nftCreator, setNFTCreator] = useState({})
	// const exposeCreatorInfo = (creator) => {
	// 	setNFTCreator(creator)
	// }

	// //getting info from server about the creator
	// let result;
	// useEffect(() => {

	// 	async function getNFTCreator() {
	// 		result = await userService.getUserById(authorId)
	// 		setClassAuthor(result["acf"])
	// 	}

	// 	getClassAuthor();

	// }, [])

	return (
		<div className="col-lg-4 col-md-6 col-sm-12 class-item filter-1 wow fadeInUp" data-wow-delay="0.0s">
			<NavLink to={`/nft-details/${nftData._id}`}>
			<div className="class-wrap">
				<div className="class-img">
					<img src={nftData.imageUrl} alt="Class Image" />
				</div>
				<div className="class-text">

					{/* {authorId ? <ClassTeacherInfo classAuthor={classAuthor} cardId={cardId} authorId={authorId}/> : ''} */}

					<h2>{nftData.name}</h2>
					<div className="class-meta">
						<p><i className="fa fa-usd"></i> {nftData.price}</p>
						<p><i className="fab fa-btc"></i> {nftData.type}</p>
					</div>
				</div>
			</div>
			</NavLink>
		</div>
	)
}
export default SingleNFTCard;