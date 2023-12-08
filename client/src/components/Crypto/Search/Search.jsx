import debounce from "lodash.debounce";
import React, { useContext, useState } from "react";
import { CryptoContext } from "../../../context/CryptoContext";
import searchIcon from "../../../assets/search-icon.svg";
import "./Search.css"; 

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  const handleInput = (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };

  return (
    <>
    <div className="search-container-wrapper"> 
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="search-container">
          <input
            type="text"
            name="search"
            onChange={handleInput}
            value={searchText}
            className="form-input"
            placeholder="search here..."
          />
          <button type="submit" className="form-button">
            <img src={searchIcon} className="w-100 h-auto" alt="search" />
          </button>
        </div>
      </form>

      {searchText.length > 0 && (
        <ul className="results-list">
          {searchData ? (
            searchData.map((coin) => (
              <li
                className="d-flex align-items-center ml-4 my-2 cursor-pointer"
                key={coin.id}
                onClick={() => selectCoin(coin.id)}
              >
                <img className="w-1rem h-1rem mx-1.5" src={coin.thumb} alt={coin.name} />
                <span>{coin.name}</span>
              </li>
            ))
          ) : (
            <div className="loading-container">
              <div className="loading-spinner" role="status" />
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </ul>
      )}
      </div>
    </>
  );
};

const Search = () => {
  const { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce((val) => {
    getSearchResult(val);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search;