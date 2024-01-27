import React from 'react';
import './Pokemon.css';
import PokemonType from './PokemonType';

export default function Pokemon({ pokemon }) {
  const { sprites } = pokemon;

  return (
    <div className="pokedex-pokemon" key={pokemon.id}>
      <div className="pokedex-pokemon-id-name">
        {pokemon.id}
        {' - '}
        {pokemon.name}
      </div>
      <PokemonType pokemon={pokemon} />
      <div className="pokedex-pokemon-sprites">
        {sprites.front_default && <img src={sprites.front_default} alt={pokemon.name} />}
        {sprites.front_shiny && <img src={sprites.front_shiny} alt={pokemon.name} />}
      </div>
    </div>
  );
}
