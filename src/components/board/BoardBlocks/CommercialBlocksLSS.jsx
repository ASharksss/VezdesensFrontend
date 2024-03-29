import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Card from "../../cards/Card";
import {STATIC_HOST} from "../../../utils";


const CommercialBlocksLss = ({items}) => {
  const {isAuth} = useSelector(state => state.user)
  let length = 0
  let countL = 0, countStPl = 0
  if (items !== undefined) {
    countL = items.filter((item) => (item.typeAdId === 3)).length;
    countStPl = items.filter((item) => (item.typeAdId === 2)).length;
    length = countL + countStPl
  }
  console.log(items)
  return (
    <div className='grid'
         style={{gridTemplateColumns: `repeat(${length === 1 ? '2' : '3'}, ${length === 1 ? `${countL === 0 ? '400px' : '1fr'}` : '1fr'})`}}>
      {items !== undefined && items.map((item, index) => ((item.typeAdId === 2 || item.typeAdId === 3) &&
        <Card key={`card-${index}`}
              classname={item.typeAdId === 2 && 's' || item.typeAdId === 3 && 'l'}
              ad_image={`${STATIC_HOST}/${item.commercialImageAds[0]?.name}`}
              title={item.title}
              address={item.address}
              price={item.price}
              favorite={item.favorites}
              date={item.date}
              id={item.id}
              show={item.showPhone}
              user={item.user}
        />
      ))}
      {items !== undefined && (length === 2 || length === 1) ? (
        <NavLink to={isAuth ? `/createAd` : '/signin'} target={isAuth ? '_blank' : '_self'}>
          <div className={`card ${length === 1 ? 'l' : 's'}`}>
                        <span style={{
                          width: '100%',
                          position: 'absolute',
                          left: `${length === 1 ? '20%' : 0}`,
                          transform: 'rotate(45deg)',
                          top: `${length === 1 ? 70 : 50}%`,
                          fontSize: '26px',
                          fontWeight: 700
                        }}>Место для вашей карточки</span>
          </div>
        </NavLink>
      ) : null}
    </div>
  );
};

export default CommercialBlocksLss;
