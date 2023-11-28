import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
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
import Fancybox from "../fancybox";

const CardAd = () => {

	const [data, setData] = useState()
	const [dataRating, setDataRating] = useState()
	const [isLoading, setIsLoading] = useState()
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
			setData(res.data)
			setIsLoading(true)
		}).catch(err => {
			console.warn(err)
			alert('Ошибка получения объявления')
		})
	}, [])

	if (!isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<h1 className='card_ad_name'>{data.ad.title}</h1>
			<div className="flex">
				<Fancybox
					options={{
						Carousel: {
							infinite: false,
						},
					}}>
					<CardImgBlock ad_address={data.ad.address} images={data.ad.imageAds.length > 0 ? data.ad.imageAds : []}
												id={data.ad.objectId}/>
				</Fancybox>
				<CardDescription card_number={`№ ${data.ad.id}`} card_time={data.ad.createdAt}
												 card_views={data.ad.views} desription={data.ad.description}
												 setActiveModal={setActiveModal} setTypeModal={setTypeModal}/>
				<CardInfo price={data.ad.price} address={data.ad.address} id={data.ad.id} favorite={data.ad.favorites}
									sellerCreated={data.ad.user.createdAt} userId={data.ad.user.id} rating={data.ad.user.ratings}
									sellerName={data.ad.user.name} setActiveModal={setActiveModal} setTypeModal={setTypeModal}/>
			</div>

			{
				typeModal === 'description' ?
					<ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
										 children={<DescriptionModal description={data.ad.description}/>}/> :
					typeModal === 'phone' ?
						<ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
											 children={<PhoneModal phone={data.ad.user.phone}/>}/> :
						typeModal === 'rating' ?
							<ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
												 children={<RatingModal data={dataRating} userId={data.ad.user.id} setActiveModal={setActiveModal} setDataRating={setDataRating}/>}/> : ''
			}


		</div>
	);
};

export default CardAd;