import React, {useEffect, useState} from 'react';
import {useParams, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import '../components/profile/profile.css'
import ProfileCard from "../components/profile/profileCard";
import avatar from "../asserts/profile/profile_avatar.png"
import news from "../asserts/profile/newsBanner.png"
import Ad from "../components/cards/Ad";
import ProfileContentAd from "../components/profile/profile_content/myAd/profile_content_ad";
import Messages from "../components/profile/profile_content/messages/messages";
import MyFavorite from "../components/profile/profile_content/myAd/myFavorite";
import {AVATAR_HOST} from "../utils";
import Dialog from "../components/profile/profile_content/messages/Dialog";

const ProfilePage = () => {

  const [choice, setChoice] = useState('ads');
  const [dataUser, setDataUser] = useState([])
  const [dataAds, setDataAds] = useState([])
  const [newMessage, setNewMessage] = useState("0")
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const {user} = useSelector(state => state.user)
	const { hash } = useLocation();
	const navigate = useNavigate();

  const {id} = useParams()

	const handleCheckNewMessages = async () => {
	  await axios.get('api/chat/check')
			.then(res => {
				if (res.data.count > 99)
					setNewMessage('99+')
				else
					setNewMessage(`${res.data.count}`)
			})
	}

  useEffect(() => {
		setChoice('ads')
    const getUserInfo = async () => {
      setIsLoadingUser(true)
      await axios.get(`api/user/getOneUser/${id}`).then(res => {
				document.title = `Профиль ${res.data.name}`
        setDataUser(res.data)
				setDataAds(res.data.ads)
        setIsLoadingUser(false)
      }).catch(err => {
        console.warn(err)
        alert(err.message)
        setIsLoadingUser(false)
      })
    }
    getUserInfo()
  }, [id])


	useEffect(() => {
		if (hash && user.items.id === parseInt(id)) {
			setChoice(hash.slice(1))
			if (hash.slice(1, 5) === 'chat')
				setChoice('chat')
		}
		if (user.items.id === parseInt(id)) {
			handleCheckNewMessages()
			const intervalCheckMessageId = setInterval(() => {
				handleCheckNewMessages();
			}, 30000);
			// Функция, которая будет вызываться при размонтировании компонента
			return () => {
				// Очищаем интервал при размонтировании компонента
				clearInterval(intervalCheckMessageId);
			};
		}
	}, [hash, user.status])

	const handleChange = (choice) => {
	  navigate({
			pathname: `/profile/${id}`,
			hash: choice
		})
	}

  const MyElements = [{name: "Мои объявления", choice: 'ads'}, {name: "Сообщения", choice: "dialogs"},
    {name: "Избранное", choice: "favorites"}, {name: "Помощь", choice: "help"}]
  const OtherElements = [{name: "Объявления", choice: 'ads'}]

  if (isLoadingUser || dataUser.length === 0) {
    return <div>Loading...</div>
  } else {
    return (
      <div className='container'>
        <div className="wrapper">
          <Ad/>
          <div className="flex profile_container">
            <div className="column">
              <ProfileCard avatar={dataUser.userAvatars.length > 0 ? `${AVATAR_HOST}/${dataUser.userAvatars[0].name}` : avatar} dataUser={dataUser}/>
              <div className='news_banner'>
                <img src={news} alt="новостной баннер"/>
              </div>
            </div>
            <div className='profile_wrapper'>
              <div className="profile_links">
                {user.items.id === parseInt(id) ? MyElements.map((item, index) => (
									<button key={index}
													className={`profile_link semi_bold${choice === item.choice ? ' active' : ''}`}
													onClick={() => handleChange(item.choice)}>
										{item.name}
										{(item.choice === 'dialogs' && newMessage !== '0') ? <span className={'noticeBadge'}>{newMessage}</span> : null}
									</button>
                )) : OtherElements.map((item, index) => (
                  <button key={index}
                          className={`profile_link semi_bold${choice === item.choice ? ' active' : ''}`}
                          onClick={() => {
                            setChoice(item.choice)
                          }}>
                    {item.name}
                  </button>
                ))}
              </div>


              <div className='profile_content'>
                {
                  choice === 'ads' ? <ProfileContentAd dataUser={dataAds} setDataAds={setDataAds}/> :
                    choice === 'dialogs' ? <Messages dataUser={dataUser}/> :
											choice === 'chat' ? <Dialog/> :
												choice === 'favorites' ? <MyFavorite dataUser={dataUser}/> :
													choice === 'help' ? 'help' : 'ничего не выбрано'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePage;