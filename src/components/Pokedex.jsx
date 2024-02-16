/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokedexPage from './PokedexPage';
import PokedexPageButtons from './PokedexPageButtons';
import './Pokedex.css';

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'); // default for kanto
  const [loading, setLoading] = useState(true);

  // Ids of pokemons in each region, which is used to divide the pokedex into regions
  const regions = {
    kanto: {
      start: 1,
      end: 151,
    },
    johto: {
      start: 152,
      end: 251,
    },
    hoenn: {
      start: 252,
      end: 386,
    },
    sinnoh: {
      start: 387,
      end: 493,
    },
    unova: {
      start: 494,
      end: 649,
    },
    kalos: {
      start: 650,
      end: 721,
    },
    alola: {
      start: 722,
      end: 809,
    },
    galar: {
      start: 810,
      end: 898,
    },
    hisui: {
      start: 899,
      end: 905,
    },
    paldea: {
      start: 906,
      end: 1010,
    },
    other: {
      start: 1011,
      end: 9999, // actually an upper bound to show all other pokemons/forms
    },
  };

  // Cache
  const cache = {};

  // Function to get pokemon data by calling to PokeAPI using their URL
  // Wait for all pokemons to be retrieved before adding them to the pokemons array
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
      getPokemons(res.data.results);
    }).catch((error) => {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error fetching Pokémon data:', error);
      }
    });

    return () => cancel && cancel();
  }, [currentPageUrl]);

  const goToPage = (regionName) => {
    const region = regions[regionName];
    if (!region) {
      console.error('Invalid region name');
      return;
    }

    // Update the number of pokemons to fetch based on the region
    let numRegionPokemons = region.end - region.start + 1;
    if (region === 'other') {
      numRegionPokemons = region.end;
    }

    const newPageUrl = `https://pokeapi.co/api/v2/pokemon?limit=${numRegionPokemons}&offset=${region.start - 1}`;
    setCurrentPageUrl(newPageUrl);
  };

  return (
    <div className="pokedex">
      <PokedexPageButtons goToPage={goToPage} />
      {loading ? 'Loading...' : <PokedexPage pokemons={pokemons} />}
      <PokedexPageButtons goToPage={goToPage} />
    </div>
  );
}
