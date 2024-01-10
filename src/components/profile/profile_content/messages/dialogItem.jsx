import React from 'react';
import {formatDateToRelative, relativeDate} from "../../../../utils";

const DialogItem = ({text, sender='me', date, name}) => {
  return (
    <div className='relative'>

      <div className={sender === 'me' ? 'dialogs-sender' : 'dialogs-receiver'} >
        <h1 className='dialogs-name'>
          <span className='dialogs-name-text'>{name}</span>
          <span className={'dialogs-time'} title={formatDateToRelative(new Date(date))}>{relativeDate(new Date(date))}</span>
        </h1>
        <p className='dialogs-text'>
          {text}

        </p>
      </div>
    </div>

  );
};

export default DialogItem;