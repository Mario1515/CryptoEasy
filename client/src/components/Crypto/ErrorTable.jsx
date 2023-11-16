import React from 'react'
import { NavLink } from 'react-router-dom';

const ErrorTable = () => {
	return (
		<>
		<div className="about wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
    

                    <div className="error-page-info">
                        <div className="section-header text-left">
                            <h2>Traffic too high...</h2>
                        </div >
                        <div className="about-text error">
                        <div className="about-img">
                            <img src="./img/404.png" alt="Error Image" style={{width: '60%'}} />
                   		 </div>
                            <NavLink className="btn" to="/">Back to Home</NavLink>
                        </div>
                </div>
            </div>
        </div>
		</>
	)
}
export default ErrorTable;