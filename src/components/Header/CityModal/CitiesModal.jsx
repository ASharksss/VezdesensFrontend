import React, {useRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from './modal.module.css'
import {fetchGetGeoList, hideCities, setMainCity} from "../../../redux/slices/geoSlice";
import PreloaderComponent from "../../Preloader/PreloaderComponent";

const isVisible = (elem) => {
    const rect = elem.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const CitiesModal = ({handleAddress=undefined}) => {
    const dispatch = useDispatch()
    const {data, mainPath, mainCity, mainSlugCity} = useSelector(state => state.geo)
    const {status, items} = data

    const [idCity, setIdCity] = useState(1)
    const [nameCity, setNameCity] = useState(mainCity)
    const [slugCity, setSlugCity] = useState(mainSlugCity)
    const [idRegion, setIdRegion] = useState(1)
    const [nameRegion, setNameRegion] = useState('')
    const [nameDistrict, setNameDistrict] = useState('')
    const [idDistrict, setIdDistrict] = useState(1)

    const cityRef = useRef(null)
    const regionRef = useRef(null)

    const isLoading = status === 'loading';

    const getData = async () => {
        await dispatch(fetchGetGeoList())
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (!isLoading) {
            setIdCity(mainPath.id)
            setIdRegion(mainPath.positionRegionId)
            setIdDistrict(mainPath.positionDistrictId)
        }
    }, [isLoading])

    const handleSetDistrict = (id, name) => {
        setIdDistrict(id)
        setIdRegion(0)
        setNameRegion(name)
    }
    const handleSetRegion = (id, name) => {
        setIdRegion(id)
        setNameRegion(name)
    }
    const handleSetCity = (id, name, slug) => {
        setIdCity(id)
        setNameCity(name)
        setSlugCity(slug)
    }

    const handleSave = (event) => {
        if (nameCity.trim() === '') return;
        const data = {
            name: nameCity,
            slug: slugCity,
            path: {id: idCity, positionRegionId: idRegion, positionDistrictId: idDistrict}
        }
        dispatch(setMainCity(data))
        dispatch(hideCities())
        window.location.reload()
    }


    useEffect(() => {
        if (cityRef.current !== null) {
            cityRef.current.focus();
            if (!isVisible(cityRef.current)) {
                cityRef.current.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
            }
        }
    }, [cityRef.current]);
    useEffect(() => {
        if (regionRef.current !== null) {
            regionRef.current.focus();
            if (!isVisible(regionRef.current)) {
                regionRef.current.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
            }
        }
    }, [regionRef.current]);

    useEffect(() => {
        if (handleAddress === undefined || (idRegion === 1 && idDistrict === 1 && idCity) || items.length === 0) return;
        const district = items.districts.find(item => item.id === idDistrict).name
        const region = items.regions.find(item => item.id === idRegion).name
        const city = items.cities.find(item => item.id === idCity).name
        setNameRegion(region)
        setNameDistrict(district)
        setNameCity(city)
    }, [handleAddress, idCity])

    if (isLoading)
        return <PreloaderComponent/>

    const districts = items.districts
    const regions = items.regions.filter(item => item.positionDistrictId === idDistrict)
    const cities = items.cities.filter(item => item.positionRegionId === idRegion)

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <h3 className={style.title}>Округи</h3>
                    <ul className={style.content}>
                        {districts.map((item, index) => (
                            <li className={`${style.choice} ${idDistrict === item.id ? style.active : ''}`}
                                key={`district-${index}`} onClick={() => handleSetDistrict(item.id, item.name)}>{item.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={style.container}>
                    <h3 className={style.title}>Регионы</h3>
                    <ul className={style.content}>
                        {regions.map((item, index) => (
                            <li ref={idRegion === item.id ? regionRef : null}
                                className={`${style.choice} ${idRegion === item.id ? style.active : ''}`}
                                key={`regions-${index}`} onClick={() => handleSetRegion(item.id, item.name)}>{item.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={style.container}>
                    <h3 className={style.title}>Города</h3>
                    <ul className={style.content}>
                        {cities.map((item, index) => (
                            <li ref={idCity === item.id ? cityRef : null}
                                className={`${style.choice} ${idCity === item.id ? style.active : ''}`}
                                key={`cities-${index}`}
                                onClick={() => handleSetCity(item.id, item.name, item.citySlug)}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={style.buttonWrapper}>
                <button type='button' className={style.button} onClick={handleAddress === undefined ? handleSave : () => handleAddress(nameCity, nameRegion, nameDistrict)}>Сохранить</button>
            </div>
        </>
    );
};

export default CitiesModal;
