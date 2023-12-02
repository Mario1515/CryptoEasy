import { useContext, useRef } from "react";
import paginationArrow from "../../../assets/pagination-arrow.svg";
import { CryptoContext, CryptoProvider } from "../../../context/CryptoContext";

import rightArrow from "../../../assets/right-arrow.png";


import "./Pagination.css";

const Pagination = () => {
  

  let { page, setPage, totalPages, perPage, cryptoData } = useContext(CryptoContext);

  const TotalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="pagination-container">
        <ul className="pagination-buttons-container">
          <li>
            <button className="pagination-arrow-right rotated" onClick={prev}>
              <img className="pagination-arrow-right" src={rightArrow} alt="left" />
            </button>
          </li>

          {page + 1 === TotalNumber || page === TotalNumber ? (
            <li>
              <button onClick={multiStepPrev} className="pagination-button ">
                ...
              </button>
            </li>
          ) : null}

          {page - 1 !== 0 ? (
            <li>
              <button onClick={prev} className="pagination-number" >
                {page - 1}
              </button>
            </li>
          ) : null}

          <li>
            <button disabled className="pagination-button pagination-number" >
              {page}
            </button>
          </li>

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button onClick={next} className="pagination-number">
                {page + 1}
              </button>
            </li>
          ) : null}

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button onClick={multiStepNext} className="pagination-number">
                ...
              </button>
            </li>
          ) : null}

          {page !== TotalNumber ? (
            <li>
              <button onClick={() => setPage(TotalNumber)} className="pagination-number">
                {TotalNumber}
              </button>
            </li>
          ) : null}

          <li>
            <button className="pagination-arrow-right" onClick={next}>
              <img className="pagination-arrow-right" src={rightArrow} alt="right" />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};
export default Pagination;