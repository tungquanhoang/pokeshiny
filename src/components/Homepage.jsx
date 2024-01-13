import React, { useState } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import Pokedex from './Pokedex';

export default function Homepage() {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Functions to handle searching for one Pokemon
  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`)
      .then((res) => {
        setPokemon(res.data); // Set the result as the only Pokemon
        setLoading(false);
        setPokemon(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log('There was an ERROR: ', error);
      });
  }

  if (loading) return 'Loading...';

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      {Object.keys(pokemon).length !== 0 ? <Pokemon pokemon={pokemon} /> : null}
      <Pokedex />
    </>
  );
}
