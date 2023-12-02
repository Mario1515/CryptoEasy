import Carousel from 'react-bootstrap/Carousel';
import { testCryptoData } from "../../common/testCryptoData";
import TrendingCrypto from '../TrendingCrypto/TrendingCrypto';

import "./Carroussel.css";

const Carroussel = () => {
    
const cryptoData = testCryptoData();
    
  return (

    <> 
    <Carousel slide={false}>
        {cryptoData.map(c => (
        <Carousel.Item key={c.id}>
        <TrendingCrypto crypto={c}/> 
        <Carousel.Caption>
          <h3>{c.name}</h3>
          <span className="coin-info">
          Data provided by{" "}
          <a
            className="text-coin"
            href="http://www.coingecko.com"
            rel="noreferrer"
            target={"_blank"}
          >
            CoinGecko
          </a>
        </span>
        </Carousel.Caption>
      </Carousel.Item>
        ))}
    </Carousel>

    </>
  );
}

export default Carroussel
