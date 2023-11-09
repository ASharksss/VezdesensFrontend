import React, {useEffect, useState} from 'react';
import '../components/profile/profile.css'
import ProfileCard from "../components/profile/profileCard";
import avatar from "../asserts/profile/profile_avatar.png"
import news from "../asserts/profile/newsBanner.png"
import Ad from "../components/cards/Ad";
import ProfileContentAd from "../components/profile/profile_content/myAd/profile_content_ad";
import Messages from "../components/profile/profile_content/messages/messages";
import MyFavorite from "../components/profile/profile_content/myAd/myFavorite";
import {useParams} from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {

  const [choice, setChoice] = useState('ads');
  const [dataUser, setDataUser] = useState()
  const [isLoadingUser, setIsLoadingUser] = useState()

  const {id} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/getOneUser/${id}`).then(res => {
      setDataUser(res.data)
      setIsLoadingUser(true)
    }).catch(err => {
      console.warn(err)
      alert(err.message)
    })
  }, [])



  if(!isLoadingUser) {
    return <div>Loading...</div>
  }



  const changeClass = (event) => {
    event.currentTarget.className += ' active'
  }

  return (
    <div className='container'>
      <div className="wrapper">
        <Ad/>
        <div className="flex profile_container">
          <div className="column">
            <ProfileCard avatar={avatar} dataUser={dataUser}/>
            <div className='news_banner'>
              <img src={news} alt="новостной баннер"/>
            </div>
          </div>
          <div className='profile_wrapper'>
            <div className="profile_links">
              <button className='profile_link semi_bold ' onClick={(event) => {
                setChoice('ads')
                changeClass(event)
              }}>
                Мои объявления
              </button>
              <button className='profile_link semi_bold ' onClick={(event) => {
                setChoice('dialogs')
                changeClass(event)
              }}>
                Сообщения
              </button>
              <button className='profile_link semi_bold ' onClick={(event) => {
                setChoice('favorites')
                changeClass(event)
              }}>
                Избранное
              </button>
              <button className={'profile_link semi_bold'} onClick={(event) => {
                setChoice('help')
                changeClass(event)
              }}>
                Помощь
              </button>
            </div>


            <div className='profile_content'>
              {
                choice === 'ads' ? <ProfileContentAd dataUser={dataUser}/> :
                  choice === 'dialogs' ? <Messages/> :
                    choice === 'favorites' ? <MyFavorite/> :
                      choice === 'help' ? 'help' : 'ничего не выбрано'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;