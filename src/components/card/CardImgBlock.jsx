import React from 'react';
import smallImg from '../../asserts/smallImg.png'
import SmallImg from "./SmallImg";

const CardImgBlock = () => {
  return (
    <div>
      <div className="smallImg">
        <SmallImg img={smallImg} title={'Наушник Промакс'}/>
        <SmallImg img={smallImg} title={'Наушник Промакс'}/>
        <SmallImg img={smallImg} title={'Наушник Промакс'}/>
      </div>
    </div>
  );
};

export default CardImgBlock;