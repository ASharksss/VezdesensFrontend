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


  const elements = [{name: "Мои объявления", choice: 'ads'}, {name: "Сообщения", choice: "dialogs"},
    {name: "Избранное", choice: "favorites"}, {name: "Помощь", choice: "help"}]

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
              {elements.map((item, index) => (
                  <button key={index} className={choice === item.choice ? 'profile_link semi_bold active' : 'profile_link semi_bold'}
                          onClick={() => {setChoice(item.choice)}}>
                    {item.name}
                  </button>
              ))}
            </div>


            <div className='profile_content'>
              {
                choice === 'ads' ? <ProfileContentAd dataUser={dataUser}/> :
                  choice === 'dialogs' ? <Messages dataUser={dataUser}/> :
                    choice === 'favorites' ? <MyFavorite dataUser={dataUser}/> :
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