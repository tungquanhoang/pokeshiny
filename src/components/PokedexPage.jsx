import React from 'react';
import './PokedexPage.css';
import Pokemon from './Pokemon';

export default function PokedexPage({ pokemons }) {
  return (
    <div className="pokedex-page">
      {pokemons.map((p) => (
        <Pokemon pokemon={p} />
      ))}
    </div>
  );
}
