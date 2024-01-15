import React from 'react';

import Pokedex from './Pokedex';
import SearchBar from './SearchBar';

export default function Homepage() {
  return (
    <>
      <SearchBar />
      <Pokedex />
    </>
  );
}
