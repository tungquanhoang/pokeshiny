import React from 'react';
import Pokedex from './Pokedex';
import SearchBar from './SearchBar';
import './Homepage.css';

export default function Homepage() {
  return (
    <div className="homepage">
      <SearchBar />
      <Pokedex />
    </div>
  );
}
