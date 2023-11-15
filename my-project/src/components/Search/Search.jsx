// Search.jsx

import debounce from "lodash.debounce";
import React, { useContext, useState } from "react";
import searchIcon from "../../assets/search-icon.svg";
import { CryptoContext } from "../../context/CryptoContext";
import searchcss from "./Search.css";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  const handleInput = (e) => {
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
    <form
      className="d-flex align-items-center mb-1"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="search"
        onChange={handleInput}
        value={searchText}
        className="form-control me-2"
        placeholder="Search here..."
      />
      <button
        type="submit"
        className="btn btn-outline-secondary"
      >
        <img src={searchIcon} alt="search" />
      </button>

      {searchText.length > 0 && searchData && (
        <ul className="list-group position-absolute w-100 mt-1">
          {searchData.map((coin) => (
            <li
              className="list-group-item d-flex align-items-center cursor-pointer"
              key={coin.id}
              onClick={() => selectCoin(coin.id)}
            >
              <img
                className="w-2 h-2 me-2"
                src={coin.thumb}
                alt={coin.name}
              />
              <span>{coin.name}</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

const Search = () => {
  const { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce((val) => {
    getSearchResult(val);
  }, 2000);

  return (
    <div className="position-relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search;