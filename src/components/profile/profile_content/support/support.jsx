import React, {useEffect, useState} from 'react';
import Appeal from "./appeal";
import axios from "axios";
import {NavLink} from "react-router-dom";

const Support = () => {
  const [data, setData] = useState([])

  const getData = async () => {
    await axios.get(`api/support/getAllAppeal`)
      .then(res => setData(res.data))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='support'>
      {data.map(item => (
        <NavLink state={{data: item}} to={`?id=${item.id}#appeal`}>
          <Appeal item={item}/>
        </NavLink>
      ))}

    </div>
  );
};

export default Support;