import React from 'react';
import './PokemonType.css';

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

export default function PokemonType({ pokemon }) {
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

  const types = pokemon.types.map((type) => type.type.name);

  return (
    <div className="poke-types">
      {types.map((type) => (
        <img src={returnTypeIcon(type)} alt="type" />
      ))}
    </div>
  );
}
