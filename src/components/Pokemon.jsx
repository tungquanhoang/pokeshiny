import React from 'react';
import './Pokemon.css';

export default function Pokemon({ pokemon }) {
  const { sprites } = pokemon;

  return (
    <div className="pokemon" key={pokemon.id}>
      <div className="pokemon-id-name">
        {pokemon.id}
        {' - '}
        {pokemon.name}
      </div>
      <div className="pokemon-sprites">
        {sprites.front_default && <img src={sprites.front_default} alt={pokemon.name} />}
        {sprites.front_shiny && <img src={sprites.front_shiny} alt={pokemon.name} />}
      </div>
    </div>
  );
}
