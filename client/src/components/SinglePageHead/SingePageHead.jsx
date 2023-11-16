import { NavLink } from 'react-router-dom';
import "../SinglePageHead/SingePageHead.css"

const SinglePageHead = ({pageInfo}) => {
	return (
		<div className="page-header">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h2>{pageInfo?.name}</h2>
				</div>
				<div className="col-12">
					<NavLink to="/">Home</NavLink>
					<NavLink to={`/${pageInfo?.slug}`}>{pageInfo?.name}</NavLink>
				</div>
			</div>
		</div>
	</div>
	)
}

export default SinglePageHead;