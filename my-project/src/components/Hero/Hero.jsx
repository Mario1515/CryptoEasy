import { Link } from 'react-router-dom';
import './Hero.css';
import hero from '../../assets/hero.avif';

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6">
              <div className="hero-text">
                <h1>Yoga Practice For Good Health</h1>
                <p>
                  Join our classes to attain your desired health and body goals. It is all about living your best life and we're here to help!
                </p>
                <div className="hero-btn">
                  <Link className="btn" to="/classes">Explore Classes</Link>
                  <Link className="btn" to="/contact">Contact Us</Link>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img src={hero} alt="Hero Image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
