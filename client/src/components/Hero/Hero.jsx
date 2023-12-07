import { NavLink } from 'react-router-dom';
import hero from '../../assets/hero.avif';
import Carroussel from '../Crypto/Carrousel/Carroussel';

import './Hero.css';

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6">
              <div className="hero-text">
                <h1>Unleash the Future of Crypto with our Product</h1>
                <p>
                Join Crypto Easy today and be part of a community that's shaping the future of finance!
                </p>
                <div className="hero-btn">
                  <NavLink className="btn" to="/crypto">Explore Crypto</NavLink>
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

      <Carroussel/>
    </>
  );
};

export default Hero;
