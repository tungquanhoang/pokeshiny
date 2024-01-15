/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './PokemonPage.css';

import normal from '../assets/type_icons/normal.png';
import fighting from '../assets/type_icons/fighting.png';
import flying from '../assets/type_icons/flying.png';
import poison from '../assets/type_icons/poison.png';
import ground from '../assets/type_icons/ground.png';
import rock from '../assets/type_icons/rock.png';
import bug from '../assets/type_icons/bug.png';
import ghost from '../assets/type_icons/ghost.png';
import steel from '../assets/type_icons/steel.png';
import fire from '../assets/type_icons/fire.png';
import water from '../assets/type_icons/water.png';
import grass from '../assets/type_icons/grass.png';
import electric from '../assets/type_icons/electric.png';
import psychic from '../assets/type_icons/psychic.png';
import ice from '../assets/type_icons/ice.png';
import dragon from '../assets/type_icons/dragon.png';
import dark from '../assets/type_icons/dark.png';
import fairy from '../assets/type_icons/fairy.png';

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

  function returnTypeIcon(type) {
    switch (type) {
      case 'normal':
        return normal;
      case 'fighting':
        return fighting;
      case 'flying':
        return flying;
      case 'poison':
        return poison;
      case 'ground':
        return ground;
      case 'rock':
        return rock;
      case 'bug':
        return bug;
      case 'ghost':
        return ghost;
      case 'steel':
        return steel;
      case 'fire':
        return fire;
      case 'water':
        return water;
      case 'grass':
        return grass;
      case 'electric':
        return electric;
      case 'psychic':
        return psychic;
      case 'ice':
        return ice;
      case 'dragon':
        return dragon;
      case 'dark':
        return dark;
      case 'fairy':
        return fairy;
      default:
        return null;
    }
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

  const types = pokemon.types.map((type) => type.type.name);

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
        <div className="poke-types">
          {types.map((type) => (
            <img src={returnTypeIcon(type)} alt="type" />
          ))}
        </div>
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
