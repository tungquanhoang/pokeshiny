import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  // Function to handle changes in the pokemon search bar
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/pokemon/${searchQuery.toLowerCase()}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Pokémon name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}
