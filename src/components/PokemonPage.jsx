/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonName } = useParams();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
      });
  }, [pokemonName]);

  if (!pokemon) return 'Loading...';

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
