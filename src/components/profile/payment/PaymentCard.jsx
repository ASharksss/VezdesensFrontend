import React from 'react';
import styles from './paymentCard.module.css'
import {NavLink} from "react-router-dom";
import {STATIC_HOST} from "../../../utils";
import useUserPaymentTime from "../../../redux/hooks/useUserPaymentTime";

const PaymentCard = ({item, handleRemove}) => {
    let date = null
    if (item?.createdAt) {
        date = new Date(item.createdAt)
        date.setMinutes(date.getMinutes() + 60)
    }
    const {hours, minutes, seconds, disabled} = useUserPaymentTime(date)
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <NavLink to={`/card/${item?.adId}`}>
                    <img src={`${STATIC_HOST}/${item?.previewImage}`} alt={item?.title}/>
                </NavLink>
                <p className={styles.title}>{item?.title} </p>
                <p>Тип: {item?.name}</p>
                <div>
                    <p>Осталось
                        {hours !== null ?
                            <span> {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                            : <span> 00:00:00</span>}
                    </p>
                    <p className={styles.price}>{new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        maximumSignificantDigits: 3
                    }).format(parseInt(item?.OutSum))}</p>
                    {!disabled ?
                        <a target='_blank' href={`${item?.paymentHref}`}
                           className={styles.button} aria-disabled={disabled}>
                            Оплатить
                        </a>
                        :
                        <button onClick={() => handleRemove(item.adId)}
                        className={styles.buttonRemove}>
                            Удалить
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default PaymentCard;