/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import PokemonType from './PokemonType';

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [currentError, setCurrentError] = useState('');
  const { pokemonName } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
        setCurrentError('Error fetching Pokémon data!');
      });
  }, [pokemonName]);

  useEffect(() => {
    if (!pokemon) return;
    axios.get(pokemon.species.url)
      .then((res) => {
        setSpecies(res.data);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon species data:', error);
        setCurrentError('Error fetching Pokémon species data!');
      });
  }, [pokemon]);

  function handleGoHomepage() {
    navigate('/*');
  }

  if (currentError) {
    return (
      <div>
        <SearchBar />
        <button type="button" onClick={handleGoHomepage}>
          Home
        </button>
        <div className="pokemon-error">
          {currentError}
        </div>
      </div>
    );
  }

  if (!pokemon && !currentError) return 'Loading...';
  if (!species && !currentError) return 'Loading...';

  const { sprites } = pokemon;

  const hatchSteps = (species.hatch_counter + 1) * 255;

  return (
    <div>
      <SearchBar />
      <button type="button" onClick={handleGoHomepage}>
        Home
      </button>
      <div className="pokemon" key={pokemon.id}>
        <div className="pokemon-id-name">
          {pokemon.id}
          {' - '}
          {pokemon.name}
        </div>
        <PokemonType pokemon={pokemon} />
        <div className="pokemon-sprites">
          {sprites.front_default && <img src={sprites.front_default} alt={pokemon.name} />}
          {sprites.front_shiny && <img src={sprites.front_shiny} alt={pokemon.name} />}
        </div>
        <div className="species-details">
          <strong>Capture rate: </strong>
          {species.capture_rate}
          <br />
          <strong>Base happiness: </strong>
          {species.base_happiness}
          <br />
          <strong>Hatch counter: </strong>
          {species.hatch_counter}
          &nbsp;(
          {hatchSteps}
          &nbsp;steps)
          <br />
        </div>
      </div>
    </div>
  );
}
