import { NavLink } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import "./SingleNFTCard.css"

const SingleNFTCard = ({ nftData }) => {


	return (
		<div className="col-lg-4 col-md-6 col-sm-12 class-item filter-1 wow fadeInUp" data-wow-delay="0.0s">
			<NavLink to={`/nft-details/${nftData._id}`}>
			<div className="class-wrap">
				<div className="class-img">
					<img src={nftData.imageUrl} alt="Class Image" />
				</div>
				<div className="class-text">

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