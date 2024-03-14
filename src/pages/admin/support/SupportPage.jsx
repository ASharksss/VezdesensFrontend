import React, {useEffect, useState} from 'react';
import Appeal from "../../../components/profile/profile_content/support/appeal";
import axios from "axios";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import dialogAppeal from "../../../components/profile/profile_content/support/dialogAppeal";
import DialogAppeal from "../../../components/profile/profile_content/support/dialogAppeal";

const SupportPage = () => {

  const [data, setData] = useState([])
  const [statusOfAppealId, setTypeAppeal] = useState(1)
  const [choice, setChoice] = useState('')

  const {hash} = useLocation()
  const navigate = useNavigate()

  const getData = async () => {
    await axios({
      method: 'GET',
      url: 'api/support/getAllAppealSupport',
      params: {statusOfAppealId}
    }).then(res => setData(res.data))
  }

  useEffect(() => {
    getData()
  }, [statusOfAppealId])

  useEffect(() => {
    if (hash.slice(1, 7) === 'dialog')
      return setChoice('dialog');
    setChoice('')
  }, [hash])

  return (
    <div className='supportPage'>
      <div className='support_wrapper'>


        {
          choice === '' ?
            <>
              <div className='flex space-between items-center mb-40'>
                <h1>Страница поддержки</h1>
                <select value={statusOfAppealId} className='support-filter'
                        onChange={(e) => setTypeAppeal(e.target.value)}>
                  <option value=''>Все</option>
                  <option value={1}>Открытые</option>
                  <option value={2}>Решенные</option>
                </select>
              </div>
              {
                data?.map(item => (
                  <NavLink state={{data: item}} to={`?id=${item.id}#dialog`} className='appeal'>
                    <Appeal item={item}/>
                  </NavLink>
                ))
              }
            </>
            :
            choice === 'dialog' ?
              <>
                <button onClick={() => navigate(-1)}>Назад</button>
                <DialogAppeal isSupport={true}/>
              </>
              : null
        }

      </div>
    </div>
  );
};

export default SupportPage;