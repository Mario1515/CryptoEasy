import React, { useContext, useRef } from "react";
import Search from "../Search/Search";
import { CryptoContext } from "../../../context/CryptoContext";

import "./Filters.css"; 

const Filters = () => {
  const { setSortBy, resetFunction } = useContext(
    CryptoContext
  );
  const currencyRef = useRef(null);

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };

  return (
    <div className="container-filters">
      <div className="filters-container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6 col-sm-12">
          </div>
          <div className="col-md-6 col-sm-12 d-flex justify-content-end">
            <label className="sort-label">
              <span>Sort by:</span>
              <select
                name="sortby"
                className="form-control sort-select"
                onChange={handleSort}
              >
                <option value="market_cap_desc">Market Cap Desc</option>
                <option value="market_cap_asc">Market Cap Asc</option>
                <option value="volume_desc">Volume Desc</option>
                <option value="volume_asc">Volume Asc</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;