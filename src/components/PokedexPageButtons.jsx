import React from 'react';

export default function PokedexPageButtons({ goToPage }) {
  const regionNames = ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'hisui', 'paldea', 'other'];
  // Generate page buttons
  const pageButtons = [];
  for (let i = 0; i < regionNames.length; i += 1) {
    pageButtons.push(
      <button type="button" key={regionNames[i]} onClick={() => goToPage(regionNames[i])}>
        {regionNames[i]}
      </button>,
    );
  }

  return (
    <div>
      {pageButtons}
    </div>
  );
}
