import React from 'react';
import styles from './footer.module.css';
import {Link} from "react-router-dom";
import {STATIC_HOST} from "../../utils";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.links}>
                <Link to={`${STATIC_HOST}/docs/Personal_data_processing_policy_vezdesens.pdf`}
                      className={styles.link}>Политика обработки персональных данных</Link>
                <Link to={`${STATIC_HOST}/docs/Rules_for_publication_of_information_by_user_on_the_vezdesens.pdf`}
                      className={styles.link}>Правила публикации</Link>
                <Link to={`${STATIC_HOST}/docs/Offer_for_site_vezdesens.pdf`} className={styles.link}>Оферта</Link>
                <div className={styles.contactContainer}>
                    <p>Наши контакты:</p>
                    <p>Почта: <Link to={'mailto:four.and.one@yandex.ru'}>four.and.one@yandex.ru</Link></p>
                    <p>Телефон: <Link to={'tel:+79534911711'}>+7(953)-491-17-11</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
