import "./CreatorCard.css"

const CreatorCard = ({style, userFullName, userImage, userName}) => {


	return (

		<div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.0s" style={style}>
		<div className="creator-item">
			<div className="creator-img">
				<img src={ userImage } alt="Person Image" />
			</div>
			<div className="creator-text">
				<h2>{userFullName }</h2>
			</div>
		</div>
	</div>
	)
}

export default CreatorCard;