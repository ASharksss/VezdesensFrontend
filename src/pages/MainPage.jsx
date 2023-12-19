import React, {useEffect} from 'react';

import Board from "../components/board/Board";



const MainPage = () => {

	useEffect(() => {
		document.title = 'Главная'
	}, [])

  return (
    <div className='container'>
      <Board/>
    </div>
  );
};

export default MainPage;