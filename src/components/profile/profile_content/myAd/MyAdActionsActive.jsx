import React from 'react';
import Button from "../../../../ui/buttons/button";
import edit from "../../../../asserts/icons/edit.svg";

const MyAdActionsActive = () => {
  return (
    <div className="myAd_actions">
      <div className="actions_row-first flex space-between semi_bold"><p className='myAd_actions-title'>Осталось</p>
        <p className='myAd_actions-value'>23 дня</p></div>
      <div className="actions_row flex space-between semi_bold"><p className='myAd_actions-title'>Избранное</p><p
        className='myAd_actions-value'>1</p></div>
      <div className="actions_row flex space-between semi_bold"><p className='myAd_actions-title'>Сообщения</p><p
        className='myAd_actions-value'>0</p></div>
      <div className="actions_row flex space-between semi_bold"><p className='myAd_actions-title'>Просмотров</p><p
        className='myAd_actions-value'>289</p></div>
      <div className="myAd_btn-edit">
        <Button classname={'edit'} icon={edit}/>
      </div>
      <br/>
      <Button classname={'stroke'} children={'Снять с публикации'}/>
    </div>
  );
};

export default MyAdActionsActive;