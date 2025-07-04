import React, { useState } from 'react';
import '../scss/styles.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (e) => setCity(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <button id="submit" type="submit">
        <span className="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </button>
      <input
        type="text"
        id="search"
        placeholder="Search City ...."
        value={city}
        onChange={handleInputChange}
        autoComplete="off"
      />
    </form>
  );
};

export default SearchBar;