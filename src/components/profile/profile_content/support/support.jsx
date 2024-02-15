import React, {useEffect, useState} from 'react';
import Appeal from "./appeal";
import axios from "axios";
import {NavLink} from "react-router-dom";
import ModalMain from "../../../modal/modalMain";
import AddAppeal from "../../../modal/addAppeal";

const Support = () => {
  const [data, setData] = useState([])
  const [activeModal, setActiveModal] = useState(false)
  const [statusOfAppealId, setTypeAppeal] = useState(1  )

  const getData = async () => {
    await axios({
      method: 'GET',
      url: 'api/support/getAllAppeal',
      params: {statusOfAppealId}
    }).then(res => setData(res.data))
  }

  useEffect(() => {
    getData()
  }, [statusOfAppealId])

  return (
    <div className='support'>
      <div className="flex space-between">
        <button className='addAppeal-btn' onClick={() => setActiveModal(true)}>Создать обращение</button>
        <div>
          <select value={statusOfAppealId} className='support-filter' onChange={(e) => setTypeAppeal(e.target.value)}>
            <option value=''>Все</option>
            <option value={1}>Открытые</option>
            <option value={2}>Решенные</option>
          </select>
        </div>
      </div>

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