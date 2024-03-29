import React, {useEffect} from 'react';
import styles from './alert.module.css';
import {useDispatch} from "react-redux";
import {closeAlert} from "../../redux/slices/alertSlice";

const Alert = ({ message='' }) => {
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(closeAlert())
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            closeModal()
        }, 5100);
        return () => clearTimeout(timerId);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.alertOverlay}>
                <div className={styles.alert}>
                    <span className={styles.close} onClick={closeModal}>&times;</span>
                    <p className={styles.text}>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Alert;
