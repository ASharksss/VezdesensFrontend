import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import './card.css'
import '../modal/modal.css'
import CardImgBlock from "./CardImgBlock";
import CardDescription from "./card_description";
import CardInfo from "./card_info";
import ModalMain from "../modal/modalMain";
import DescriptionModal from "../modal/descriptionModal";
import PhoneModal from "../modal/phoneModal";
import RatingModal from "../modal/ratingModal";
import EditSVG from '../../asserts/icons/edit.svg'
import {relativeDate, formatDate, pluralRusVariant} from "../../utils";
import Button from "../../ui/buttons/button";
import PreloaderComponent from "../Preloader/PreloaderComponent";

const CardAd = ({data, setData, isLoading, setIsLoading}) => {
	const {items} = useSelector(state => state.user.user)
	const [dataRating, setDataRating] = useState()
	const [activeModal, setActiveModal] = useState(false)
	const [typeModal, setTypeModal] = useState()
	const {id} = useParams()

	useEffect(() => {
		if (typeModal === 'rating' && activeModal === true) {
			axios.get(`api/user/review/${data.ad.user.id}`)
				.then(res => {
					setDataRating(res.data)
				}).catch(err => {
				console.log(err)
				window.alert('Ошибка получения рейтинга')
			})
		}
	}, [typeModal, activeModal])

	useEffect(() => {
		axios.get(`api/ad/getOneAd/${id}`).then(res => {
			document.title = 'Картиочка № ' + res.data.ad.id + ' · ' + res.data.ad.title + ' · ' + relativeDate(new Date(res.data.ad.createdAt))
			setData(res.data)
			setIsLoading(true)
		}).catch(err => {
			console.warn(err)
			alert('Ошибка получения объявления')
		})
	}, [])

	if (!isLoading) {
		return <PreloaderComponent />
	}

	return (
		<div className='card_ad_wrapper'>
			<div className="flex items-center mb-20">
				<h1 className='card_ad_name'>{data.ad.title}</h1>
				{items.id === data.ad.user.id ? <NavLink to={`/card/${data.ad.id}/edit`}><img src={EditSVG} alt="Измемнить"/></NavLink> : null}
			</div>
			<div className='jy-start card_ad-title'>
				<p className='card_ad_address'>{data.ad.address}</p>
				<p className='number_time_views'
					 title={formatDate(data.ad.createdAt)}>{'№ ' + data.ad.id + ' · ' + relativeDate(new Date(data.ad.createdAt)) + ' · ' +
					data.ad.views + ` ${["просмотр", "просмотра", "просмотров"][pluralRusVariant(parseInt(data.ad.views))]}`}</p>
				<p style={{color: '#B5B7BD'}}>{parseInt(data.ad.viewsToday) > 0 ? `+${data.ad.viewsToday} (сегодня)` : 'За сегодня нет просмотров'}</p>
			</div>
			<div className="flex">
				<CardImgBlock ad_address={data.ad.address} images={data.ad.imageAds.length > 0 ? data.ad.imageAds : []}
											id={data.ad.objectId}/>
				<div>
					<CardDescription description={data.ad.description}
									 characteristics={{input: data.ad.adCharacteristicInputs, select: data.ad.adCharacteristicSelects}}/>
					<div className="flex jy-end" onClick={() => {
						setActiveModal(true)
						setTypeModal('description')
					}}>
						<div className='show_more-btn'>
							<Button classname={'stroke'} children={'Показать еще'}/>
						</div>
					</div>
				</div>

				<CardInfo price={data.ad.price} address={data.ad.address} id={data.ad.id} favorite={data.ad.favorites} show={data.ad.showPhone}
									sellerCreated={data.ad.user.createdAt} userId={data.ad.user.id} rating={data.ad.user.ratings}
									sellerName={data.ad.user.name} setActiveModal={setActiveModal} setTypeModal={setTypeModal}/>
			</div>

			{
				typeModal === 'description' ?
					<ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
										 children={<DescriptionModal adCharacteristicInputs={data.ad.adCharacteristicInputs}
																	 description={data.ad.description} adCharacteristicSelects={data.ad.adCharacteristicSelects}/>}/> :
					typeModal === 'phone' ?
						<ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
											 children={<PhoneModal phone={data.ad.user.phone}/>}/> :
						typeModal === 'rating' ?
							<ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
												 children={<RatingModal data={dataRating} userId={data.ad.user.id}
																								setActiveModal={setActiveModal} setDataRating={setDataRating}/>}/> : ''
			}


		</div>
	);
};

export default CardAd;
