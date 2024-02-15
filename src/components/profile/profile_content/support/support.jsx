import React, {useEffect, useState} from 'react';
import Appeal from "./appeal";
import axios from "axios";
import {NavLink} from "react-router-dom";
import ModalMain from "../../../modal/modalMain";
import AddAppeal from "../../../modal/addAppeal";

const Support = () => {
  const [data, setData] = useState([])
  const [activeModal, setActiveModal] = useState(false)

  const getData = async () => {
    await axios.get(`api/support/getAllAppeal`)
      .then(res => setData(res.data))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='support'>
      <button className='addAppeal-btn' onClick={() => setActiveModal(true)}>Создать обращение</button>
      {data.map(item => (
        <NavLink state={{data: item}} to={`?id=${item.id}#appeal`} className='appeal'>
          <Appeal item={item}/>
        </NavLink>
      ))}
      {
        activeModal ? <ModalMain activeModal={activeModal} setActiveModal={setActiveModal} children={<AddAppeal/>}/>
          : null
      }

    </div>
  );
};

export default Support;