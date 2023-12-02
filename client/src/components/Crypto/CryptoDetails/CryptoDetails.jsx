import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../../../context/CryptoContext";
import HighLowIndicator from "../../common/HighLowIndicator";
import AllTimeCryptoPercentage from "../../common/AllTimeCryptoPercentage";

import "./CryptoDetails.css";

const CryptoDetails = ({ data, onClose }) => {
  const { getCoinData } = useContext(CryptoContext);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (data && !dataLoaded) {
      getCoinData(data.id);
      setDataLoaded(true); // Flag to avoit repeated calls
    }
  }, [data, getCoinData, dataLoaded]);

  const close = () => {
    onClose();
  };

  console.log(data);
    return (

        // Structure and background
        <div className="overlay" onClick={close}>
            <div className="custom-modal" onClick={(e) => e.stopPropagation()}>


    {/* Crypto Container  */}
    {data ? (
        <div className="flex-container">
            <div className="column-container">
                <div className="image-container">
                    <img className="image" src={data.image} alt={data.id} />
                    <h1 className="title">{data.name}</h1>
                    <span className="symbol">{data.symbol}</span>
                </div>  

                {/* Details container  */}

                <div className="big-containter-details">
                    <div className="column-details">
                        <div className="between-details">
                            <span className="crypto-title">
                                Price
                            </span>
                            {/* Price changes % */}
                            <div
                                className={`bg-opacity-25 float-right ${data.price_change_percentage_24h > 0
                                        ? "bg-green text-green"
                                        : "bg-red text-red"
                                    } `}
                            >
                                <span>
                                    {Number(data.price_change_percentage_24h).toFixed(2)}%
                                </span>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={` ${data.price_change_percentage_24h > 0
                                            ? "fill-green rotate-180"
                                            : "fill-red"
                                        }`}
                                >
                                    <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                                </svg>
                            </div>
                        </div>
                        {/* Price */}
                        <h2 className="crypto-value-h2">
                            ${new Intl.NumberFormat("en-IN", {
                            maximumSignificantDigits: 5,
                            }).format(data.current_price)}
                        </h2>
                                </div>
                            </div>
                            {/* Market Cap */}
                            <div className="market-cap-container">
                                <div className="inner-container">
                                    <span className="crypto-title">
                                        Market Cap
                                    </span>
                                    <h2 className="crypto-value-h2-small">
                                        ${new Intl.NumberFormat("en-IN", {
                                            minimumFractionDigits: 0,
                                        }).format(data.market_cap)}
                                    </h2>
                                </div>
                                {/* Fully diluted */}
                                <div className="float-right fully-diluted">
                                <span className="crypto-title">
                                    Fully Diluted Valuation
                                </span>
                                <h2 className="crypto-value-h2-small">
                                    ${new Intl.NumberFormat("en-IN", {
                                    notation: "compact",
                                    }).format(data.fully_diluted_valuation)}
                                </h2>
                                </div>
                            </div>

                            {/* Total Volume */}
                            <div className="inner-container">
                                <span className="crypto-title">
                                    Total Volume
                                </span>
                                <h2 className="crypto-value-h2-small">
                                    {new Intl.NumberFormat("en-IN", {
                                        minimumFractionDigits: 0,
                                    }).format(data.total_volume)}
                                </h2>
                            </div>
                            {/* High Low Indicator */}
                            <div className="inner-container">
                                <HighLowIndicator
                                    currentPrice={data.current_price}
                                    high={data.high_24h}
                                    low={data.low_24h}
                                />
                            </div>

                            {/* High Low Prices  */}

                            <div className="market-data-container">
                                <div className="market-data-item">
                                    <span className="crypto-title">
                                        Low 24H
                                    </span>
                                    <h2 className="crypto-value-h2-small">
                                        {new Intl.NumberFormat("en-IN", {
                                            minimumFractionDigits: 5,
                                        }).format(data.low_24h)}
                                    </h2>
                                </div>
                                <div className="market-data-item custom-margin">
                                    <span className="crypto-title">
                                        High 24H
                                    </span>
                                    <h2 className="crypto-value-h2-small">
                                        {new Intl.NumberFormat("en-IN", {
                                            minimumFractionDigits: 5,
                                        }).format(data.high_24h)}
                                    </h2>
                                </div>
                            </div>
                            {/* Market Supply  */}

                            <div className="market-data-container">
                                <div className="market-data-item">
                                    <span className="crypto-title">
                                        Max Supply
                                    </span>
                                    <h2 className="crypto-value-h2-small">
                                        {new Intl.NumberFormat("en-IN", {
                                             minimumFractionDigits: 0,
                                        }).format(data.max_supply)}
                                    </h2>
                                </div>
                                <div className="market-data-item">
                                    <span className="crypto-title">
                                        Circulating Supply
                                    </span>
                                    <h2 className="crypto-value-h2-small">
                                        {new Intl.NumberFormat("en-IN", {
                                           minimumFractionDigits: 0,
                                        }).format(data.circulating_supply)}
                                    </h2>
                                </div>
                            </div>
                            {/* Since All Time High */}

                            <div className="market-data-container">
                                <div className="market-data-item">
                                    <span className="crypto-title">
                                        Since All-Time High
                                    </span>
                                    <AllTimeCryptoPercentage data={data.ath_change_percentage}/>
                                </div>
                                <div className="market-data-item custom-margin1">
                                <div className="market-data-item">
                                    <span className="crypto-title">
                                        Since All-Time Low
                                    </span>
                                    <AllTimeCryptoPercentage data={data.atl_change_percentage}/>
                                </div>
                            </div>
                         </div>
                        </div>
                    </div>
                ) : null}

            </div>
        </div>
    );
};

export default CryptoDetails;