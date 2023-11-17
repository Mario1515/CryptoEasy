import * as userService from '../../../services/userService'
import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

//import { ClassTeacherInfo } from '../ClassTeacherInfo/ClassTeacherInfo';

import "./SingleNFTCard.css"

const SingleNFTCard = ({nftData}) => {

console.log(`SingleCard NFT I received this data ->  ${JSON.stringify(nftData)}`)
	// TODO AUTHOR NFT

	return (
		<div className="col-lg-4 col-md-6 col-sm-12 class-item filter-1 wow fadeInUp" data-wow-delay="0.0s">
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
	</div>
	)
}
export default SingleNFTCard;