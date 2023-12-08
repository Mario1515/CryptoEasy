import React, { useContext, useState } from "react";

import { CryptoContext } from "../../../context/CryptoContext"; 
import CryptoDetails from "../CryptoDetails/CryptoDetails";

import "./Table.css"; // Custom styling

const Table = () => {

  const [selectedData, setSelectedData] = useState(null);
  const [isCryptoDetailsVisible, setCryptoDetailsVisible] = useState(false);

  const handleCryptoClick = (data) => {
    setSelectedData(data);
    setCryptoDetailsVisible(true);
  };

  const closeCryptoDetails = () => {
    setSelectedData(null);
    setCryptoDetailsVisible(false);
  };

  let { cryptoData, error } = useContext(CryptoContext);

  return (
    <div className="table-frame">
      {cryptoData ? (
        <table className="table">
        <thead className="thead-dark">
            <tr>
              <th>Asset</th>
              <th>Name</th>
              <th>Price</th>
              <th>Total Volume</th>
              <th>Market Cap Change</th>
              <th>1H</th>
              <th>24H</th>
              <th>7D</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((data) => (
              <tr key={data.id}>
                <td className="align-middle">
                  <button className="btn btn-link">
                    <svg
                      className="w-[1.5rem] ml-1.5 fill-gray-100 hover:fill-cyan"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="cyan"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                    </svg>
                  </button>
                  <img
                    className="image-crypto"
                    src={data.image}
                    alt={data.name}
                    onClick={() => handleCryptoClick(data)}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => handleCryptoClick(data)}>
                    {data.symbol.toUpperCase()}
                  </span>
                </td>
                <td className="align-middle-name">
                      <span className="name-span"
                      onClick={() => handleCryptoClick(data)}>
                      {data.name}
                      </span>
                </td>
                <td className="align-middle">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "usd",
                  }).format(data.current_price)}
                </td>
                <td className="align-middle">${data.total_volume}</td>
                <td className="align-middle">
                  {data.market_cap_change_percentage_24h}%
                </td>
                <td className={`align-middle ${data.price_change_percentage_1h_in_currency > 0 ? "text-success" : "text-danger"}`}>
                  {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}
                </td>
                <td className={`align-middle ${data.price_change_percentage_24h_in_currency > 0 ? "text-success" : "text-danger"}`}>
                  {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}
                </td>
                <td className={`align-middle ${data.price_change_percentage_7d_in_currency > 0 ? "text-success" : "text-danger"}`}>
                  {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )  : (!error.data && !error.search) ? (

        <div className="cool-box">
        <div className="container-spinner">
        <div className="spinner spinner-border text-cyan" role="status">
          <span className="visually-hidden"></span>
        </div>
        <span className="text text-base ms-2">Please wait...</span>
      </div>
      </div>

      ) : null }

          {isCryptoDetailsVisible && (
        <CryptoDetails data={selectedData} onClose={closeCryptoDetails} />
      )}

      {/* API provider */}
        <div className="coin-info"> 
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
      </div>
    
    </div>

    
  );
};


export default Table;