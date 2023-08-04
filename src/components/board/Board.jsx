import React from 'react';
import './board.css'
import Card from "../cards/Card";
import SmallBlocks from "./BoardBlocks/SmallBlocks";
import CommercialBlocksLss from "./BoardBlocks/CommercialBlocksLSS";
import Ad from "../cards/Ad";

const Board = () => {
  return (
    <>
      <div>
        <Ad/>

        <Ad/>
        <SmallBlocks/>
        <SmallBlocks/>
        <SmallBlocks/>
        <CommercialBlocksLss/>
      </div>
    </>

  );
};

export default Board;