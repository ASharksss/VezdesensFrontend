import React from 'react';

const Appeal = ({item}) => {


  return (
    <div className='support_item flex space-between'>
      <div>
        <div><span className='support_item-title'>Обращение номер: {item.id}</span></div>
        <div>{item.topicOfAppeals.name}</div>
      </div>
      <div><span className='support_item-title'>Комментарий:</span> sdfdssadasdasdasdasdasdasdasdasdfsdfs</div>
      <div>
        <div>12.02.12</div>
        <div>{item.statusOfAppeals.name}</div>
      </div>
    </div>
  );
};

export default Appeal;