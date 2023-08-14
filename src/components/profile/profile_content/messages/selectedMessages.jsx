import React from 'react';
import Button from "../../../../ui/buttons/button";
import trash from '../../../../asserts/icons/trashWhite.svg'

const SelectedMessages = () => {
  return (
    <div className='selectedMessages flex items-center space-between'>
      <p className='selectedMessages-text'>1 чат</p>
      <Button classname={'trashBlack'} icon={trash}/>
    </div>
  );
};

export default SelectedMessages;