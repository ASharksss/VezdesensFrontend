import React from 'react';

const Appeal = ({item}) => {
  return (
    <div className='support_item flex space-between'>
      <div>
        <div><span className='support_item-title'>Обращение номер: {item.id}</span></div>
        <div>{item.topicOfAppeal.name}</div>
      </div>
      <div>
        <div>{new Date(Date.parse(item.createdAt)).toLocaleDateString()}</div>
        <div>{item.statusOfAppeal.name}</div>
      </div>
    </div>
  );
};

export default Appeal;
