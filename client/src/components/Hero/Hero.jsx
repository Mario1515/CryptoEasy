import { NavLink } from 'react-router-dom';
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
                <h1>Unleash the Future with our Product</h1>
                <p>
                Join Crypto Easy today and be part of a community that's shaping the future of finance!
                </p>
                <div className="hero-btn">
                  <NavLink className="btn" to="/classes">Explore Crypto</NavLink>
                  <NavLink className="btn" to="/contact">Contact Us</NavLink>
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
