import React from 'react';
import {formatDateToRelative, relativeDate} from "../../../../utils";

const DialogItem = ({text, sender='me', date}) => {
  return (
    <div className={sender === 'me' ? 'dialogs-sender' : 'dialogs-receiver'} >
      <p className='dialogs-text'>
				{text}
				<span className={'dialogs-time'} title={formatDateToRelative(new Date(date))}>{relativeDate(new Date(date))}</span>
      </p>
    </div>
  );
};

export default DialogItem;