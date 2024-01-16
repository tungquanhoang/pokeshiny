import React from 'react';
import { Link } from 'react-router-dom';
import './PokedexPage.css';
import Pokemon from './Pokemon';

export default function PokedexPage({ pokemons }) {
  return (
    <div className="pokedex-page">
      {pokemons.map((p) => (
        <Link key={p.id} to={`/pokemon/${p.name}`}>
          <Pokemon pokemon={p} />
        </Link>
      ))}
    </div>
  );
}
