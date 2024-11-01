import React, {useEffect, useState} from 'react';
import {useParams, useLocation, useNavigate, NavLink} from "react-router-dom";
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
import {AVATAR_HOST, getStaticAd, STATIC_HOST} from "../utils";
import Dialog from "../components/profile/profile_content/messages/Dialog";
import Support from "../components/profile/profile_content/support/support";
import DialogAppeal from "../components/profile/profile_content/support/dialogAppeal";
import PreloaderComponent from "../components/Preloader/PreloaderComponent";
import PaymentCard from "../components/profile/payment/PaymentCard";

const ProfilePage = () => {

  const [choice, setChoice] = useState('ads');
  const [dataUser, setDataUser] = useState([])
  const [dataAds, setDataAds] = useState([])
  const [newMessage, setNewMessage] = useState("0")
  const [staticAd, setStaticAd] = useState([])
  const [paymentData, setPaymentData] = useState([])

  const {user} = useSelector(state => state.user)
  const [isLoadingUser, setIsLoadingUser] = useState(user.status !== 'loading')

  const {hash} = useLocation();
  const navigate = useNavigate();

  let timer

  const {id} = useParams()

  const getPaymentData = async () => {
    await axios.get('api/payment/ads')
        .then(res => {
          setPaymentData(res.data)
        })
        .catch(err => {
          console.log(err.data.message)
        })
  }

  //timer
  useEffect(() => {
    timer = setTimeout(() => {
      setIsLoadingUser(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoadingUser) return;
    clearTimeout(timer)
  }, [isLoadingUser])

  useEffect(() => {
    getStaticAd(1, setStaticAd)
  }, [])

  const handleCheckNewMessages = async () => {
    await axios.get('api/chat/check')
      .then(res => {
        if (res.data.count > 99)
          setNewMessage('99+')
        else
          setNewMessage(`${res.data.count}`)
      })
  }

  const getUserInfo = async () => {
    setIsLoadingUser(true)
    await axios.get(`api/user/getOneUser/${id}`).then(res => {
      document.title = `Профиль ${res.data.name}`
      setDataUser(res.data)
      setDataAds(res.data.ads)
      setIsLoadingUser(false)
    }).catch(err => {
      alert(err.message)
      setIsLoadingUser(false)
    })
  }

  useEffect(() => {
    getUserInfo()
  }, [id])

  useEffect(() => {
    if (!isLoadingUser) return;
    if (parseInt(user.items.id) === parseInt(id)) getPaymentData()
    setChoice('ads')
  }, [id, isLoadingUser])


  useEffect(() => {
    if (hash && user.items.id === parseInt(id)) {
      setChoice(hash.slice(1))
      if (hash.slice(1, 5) === 'chat')
        setChoice('chat')
      if (hash.slice(1, 7) === 'appeal')
        setChoice('appeal')
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
  const handleRemove = async (id) => {
    const check = window.confirm('Удалить объявление?')
    if (check) {
      await axios.delete(`api/ad/remove?adId=${dataUser.id}`)
          .then(() => {
            const removedData = paymentData.filter(item => item.id !== id)
            setPaymentData(removedData)
          })
    }
  }

  const MyElements = [{name: "Мои объявления", choice: 'ads'}, {name: "Сообщения", choice: "dialogs"},
    {name: "Избранное", choice: "favorites"}, {name: "Помощь", choice: "help"}]
  const OtherElements = [{name: "Объявления", choice: 'ads'}]

  if (isLoadingUser || dataUser.length === 0) {
    return <PreloaderComponent />
  } else {
    return (
      <div className='container'>
        <div className="wrapper">
          {staticAd[0]?.imageName && <Ad image={`${STATIC_HOST}/promotion/${staticAd[0]?.imageName}`} href={staticAd[0]?.href}/>}
          <div className="flex profile_container">
            <div className="column">
              <ProfileCard
                avatar={dataUser.userAvatars.length > 0 ? `${AVATAR_HOST}/${dataUser.userAvatars[0].name}` : avatar}
                dataUser={dataUser}/>
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
                    {(item.choice === 'dialogs' && newMessage !== '0') ?
                      <span className={'noticeBadge'}>{newMessage}</span> : null}
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
              {(paymentData.length > 0 && choice === 'ads') ?
              <div>
                {paymentData.map((item, index) => item?.adId && (
                    <React.Fragment key={`payment-${index}`}>
                      <PaymentCard item={item} handleRemove={handleRemove} />
                    </React.Fragment>
                ))}
              </div> : null}
              <div className='profile_content'>
                {
                  choice === 'ads' ? <ProfileContentAd dataUser={dataAds} setDataAds={setDataAds}/> :
                    choice === 'dialogs' ? <Messages dataUser={dataUser}/> :
                      choice === 'chat' ? <Dialog/> :
                        choice === 'favorites' ? <MyFavorite dataUser={dataUser}/> :
                          choice === 'help' ? <Support/> :
                            choice === 'appeal' ? <DialogAppeal /> :
                                choice === 'errorPayed' ? <>Ошибка оплаты услуги</>
                  : 'ничего не выбрано'
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
