import React from 'react';

export default function PokedexPageButtons({
  goToNextPage, goToPreviousPage, goToPage, totalPages,
}) {
  // Generate page buttons
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageButtons.push(
      <button type="button" key={i} onClick={() => goToPage(i)}>
        {i}
      </button>,
    );
  }

  return (
    <div>
      {goToPreviousPage && <button type="button" onClick={goToPreviousPage}>Previous</button>}
      {pageButtons}
      {goToNextPage && <button type="button" onClick={goToNextPage}>Next</button>}
    </div>
  );
}
