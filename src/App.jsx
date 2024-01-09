/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokedexPageButtons from './components/PokedexPageButtons';
import PokedexPage from './components/PokedexPage';
import Pokemon from './components/Pokemon';

function App() {
  const numPokemons = 96;
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [currentPageUrl, setCurrentPageUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${numPokemons}&offset=0`);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [previousPageUrl, setPreviousPageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPokemons, setTotalPokemons] = useState(0);

  // Function to get pokemon data by calling to PokeAPI using their URL
  // Wait for all pokemons to be retrieved before adding them to the pokemons array
  const cache = {};

  function getPokemons(data) {
    const requests = data.map((p) => {
      // Check if the data is in the cache
      if (cache[p.url]) {
        // Return a resolved promise with the cached data
        return Promise.resolve({ data: cache[p.url] });
      }

      // If not in cache, make the Axios request and cache the response
      return axios.get(p.url).then((response) => {
        cache[p.url] = response.data;
        return response;
      });
    });

    Promise.all(requests)
      .then((pokemonResponses) => {
        const pokemonData = pokemonResponses.map((res) => res.data);
        setPokemons(pokemonData);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
      });
  }

  // Get the total number of pokemons just once
  useEffect(() => {
    // Get the total number of Pokémon on initial load
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1')
      .then((res) => {
        setTotalPokemons(res.data.count);
      });
  }, []);

  const totalPages = Math.ceil(totalPokemons / numPokemons);

  // Function get another page of pokemons when the current page URL changes
  useEffect(() => {
    setLoading(true);
    setPokemons([]);
    let cancel;
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    }).then((res) => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPreviousPageUrl(res.data.previous);
      getPokemons(res.data.results);
      setPokemon({});
    });

    return () => cancel();
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  function goToPage(pageNumber) {
    const offset = (pageNumber - 1) * numPokemons;
    const newPageUrl = `https://pokeapi.co/api/v2/pokemon?limit=${numPokemons}&offset=${offset}`;
    setCurrentPageUrl(newPageUrl);
  }

  const currentPageNumber = currentPageUrl ? parseInt(new URLSearchParams(new URL(currentPageUrl).search).get('offset'), 10) / numPokemons + 1 : 1;

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
    console.log(pokemon);
  }

  // if (loading) return 'Loading...';

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
      {loading ? 'Loading...' : <PokedexPage pokemons={pokemons} />}
      <PokedexPageButtons
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </>
  );
}

export default App;
