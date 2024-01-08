import React from 'react';

export default function PokedexPage({ goToNextPage, goToPreviousPage }) {
  return (
    <div>
      {goToPreviousPage && <button type="button" onClick={goToPreviousPage}>Previous</button>}
      {goToNextPage && <button type="button" onClick={goToNextPage}>Next</button>}
    </div>
  );
}
