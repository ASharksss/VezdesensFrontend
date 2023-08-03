import React from 'react';
import './board.css'
import Card from "../cards/Card";
import SmallBlocks from "./BoardBlocks/SmallBlocks";

const Board = () => {
  return (
    <>
      <div>
        <SmallBlocks/>
        <SmallBlocks/>
        <SmallBlocks/>
      </div>
    </>

  );
};

export default Board;