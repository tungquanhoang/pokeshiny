/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import PokemonType from './PokemonType';
import './PokemonPage.css';

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

  // Getting the sprites of the pokemon, including a shiny one
  const { sprites } = pokemon;

  // The primary type of the pokemon for dynamically-changing color
  const typeColors = {
    normal: ['#adb5bd', '#ced4da'],
    fire: ['#EE8130', '#F3C9A9'],
    water: ['#6390F0', '#ACC1E4'],
    electric: ['#F7D02C', '#FDF2C1'],
    grass: ['#7AC74C', '#bce3a6'],
    ice: ['#96D9D6', '#D6EDF2'],
    fighting: ['#C22E28', '#E7B6B4'],
    poison: ['#A33EA1', '#D3B3CD'],
    ground: ['#E2BF65', '#edd7a1'],
    flying: ['#A98FF3', '#D9DAEE'],
    psychic: ['#F95587', '#FAD2D7'],
    bug: ['#A6B91A', '#e6eea0'],
    rock: ['#B6A136', '#DACDAD'],
    ghost: ['#735797', '#B6A8C8'],
    dragon: ['#6F35FC', '#B9A7EF'],
    dark: ['#705746', '#BEB5AF'],
    steel: ['#B7B7CE', '#D8D8E3'],
    fairy: ['#D685AD', '#E6D2DD'],
  };

  const primaryType = Array.from(new Set(pokemon.types.map((type) => type.type.name)))[0];

  const pageColor = typeColors[primaryType][1];

  const cellBorderColor = typeColors[primaryType][0];

  const hatchSteps = (species.hatch_counter + 1) * 255;

  return (
    <div className="pokemon-page">
      <SearchBar />
      <button type="button" onClick={handleGoHomepage}>
        Home
      </button>
      <div className="pokemon" key={pokemon.id} style={{ backgroundColor: pageColor }}>
        <div className="pokemon-id-name">
          #
          {pokemon.id}
          {' - '}
          {pokemon.name}
          <div className="pokemon-sprites">
            {sprites.front_default && <img src={sprites.front_default} alt={pokemon.name} />}
            {sprites.front_shiny && <img src={sprites.front_shiny} alt={pokemon.name} />}
          </div>
        </div>
        <div className="pokemon-info">
          <div className="pokemon-artwork">
            {sprites.other['official-artwork'].front_default && <img src={sprites.other['official-artwork'].front_default} alt={pokemon.name} />}
            {sprites.other['official-artwork'].front_shiny && <img src={sprites.other['official-artwork'].front_shiny} alt={pokemon.name} />}
          </div>
          <table className="pokemon-details">
            <tbody>
              <tr>
                <td style={{ backgroundColor: pageColor, borderColor: cellBorderColor }}>
                  <strong>Type</strong>
                </td>
                <td aria-label="detail" style={{ backgroundColor: pageColor, borderColor: cellBorderColor }}><PokemonType pokemon={pokemon} /></td>
              </tr>
              <tr>
                <td style={{ backgroundColor: pageColor, borderColor: cellBorderColor }}>
                  <strong>Capture rate</strong>
                </td>
                <td style={{ backgroundColor: pageColor, borderColor: cellBorderColor }}>
                  {species.capture_rate}
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: pageColor, borderColor: cellBorderColor }}>
                  <strong>Base happiness</strong>
                </td>
                <td style={{ backgroundColor: pageColor, borderColor: cellBorderColor }}>
                  {species.base_happiness}
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: pageColor, borderColor: cellBorderColor }}>
                  <strong>Hatch counter</strong>
                </td>
                <td style={{ backgroundColor: pageColor, borderColor: cellBorderColor }}>
                  {species.hatch_counter}
                  &nbsp;(
                  {hatchSteps}
                  &nbsp;steps)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
