import React from 'react';

const DialogItem = ({text, sender='me'}) => {
  return (
    <div className='message-item' style={sender === 'me' ?
			{width: '60%', marginLeft: 'auto', border:'1px solid', padding: 10, borderRadius: '10px 0 0 10px', marginTop: 15} :
			{width: '60%', marginRight: 'auto', border:'1px solid', padding: 10, borderRadius: '0 10px 10px 0', marginTop: 15}}>
      <p className='text'>
				{text}
      </p>
    </div>
  );
};

export default DialogItem;