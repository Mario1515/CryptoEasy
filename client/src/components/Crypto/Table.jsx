// table.jsx
import React, { useContext } from "react";
import { CryptoContext } from "../../context/CryptoContext";
import { NavLink } from "react-router-dom";
import "./table.css"; // Custom styling

const Table = () => {
  let { cryptoData } = useContext(CryptoContext);

  return (

    <div className="table-frame">
      {cryptoData ? (
        <table class="table table-dark table-hover">
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
                      {/* SVG Path */}
                    </svg>
                  </button>
                  <img
                    className="w-[0.5rem] h-[0.5rem] mx-1.5"
                    src={data.image}
                    alt={data.name}
                  />
                  <span>
                    <NavLink to={`/${data.id}`} className="cursor-pointer">
                      {(data.symbol.toUpperCase())}
                    </NavLink>
                  </span>
                </td>
                <td className="align-middle">
                  <NavLink to={`/${data.id}`} className="cursor-pointer">
                    {data.name}
                  </NavLink>
                </td>
                <td className="align-middle">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "usd",
                  }).format(data.current_price)}
                </td>
                <td className="align-middle">{data.total_volume}</td>
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
      ) : null}
    </div>

  );
};

export default Table;