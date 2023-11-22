import "./Footer.css"
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		
		<div className="footer wow fadeIn" data-wow-delay="0.3s">
            
                <div className="container">
                    <div className="footer-info">
                        <span className="footer-logo">Crypto Easy</span>
                        <h3>Sofia, Bulgaria</h3>
                        <div className="footer-menu">
                            <p>+359 1234567</p>
                            <p>mariopetkovnfsg@gmail.com</p>
                        </div>
                </div>
                <div className="container copyright">
                    <div className="row">
                        <div className="col-md-6">
                            <p>&copy; Crypto Easy React.js Project, All Right Reserved.</p>
                        </div>
                        <div className="col-md-6">
                            <p>Designed By <a href="https://github.com/Mario1515">Mario Petkov</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	)
}

export default Footer;