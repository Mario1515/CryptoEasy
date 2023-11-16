import SinglePageHead from "../SinglePageHead/SingePageHead"
import { NavLink } from 'react-router-dom';
import "./ErrorPage.css"

const ErrorPage = () => {
	return (
		<>
		<SinglePageHead pageInfo={{name:'Error', slug:'error'}} />
		<div className="about wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
    

                    <div className="error-page-info">
                        <div className="section-header text-left">
                            <h2>You've encountered an error!</h2>
                        </div >
                        <div className="about-text error">
                        <div className="about-img">
                            <img src="./img/404.png" alt="Error Image" style={{width: '60%'}} />
                   		 </div>
                            <NavLink className="btn" to="/">Back to Website</NavLink>
                        </div>
                </div>
            </div>
        </div>
		</>
	)
}

export default ErrorPage;