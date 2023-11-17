import React from 'react';
import './pages.css'
import CardService from "../components/cards/CardService";
import CategoryAccordion from "../components/categoryAccordion/categoryAccordion";
import Ad from "../components/cards/Ad";
import BreadCrumbs from "../components/breadcrumbs/BreadCrumbs";

const CatalogBoardPage = () => {
	return (
		<div className='container'>
			<Ad/>

			{/*<BreadCrumbs/>
*/}
			<h1 className='catalogBoardPage-title'>Работа</h1>
			<div className="catalogBoardPage">

				<div className="catalogBoardPage_categories"><CategoryAccordion/></div>
				<div className="catalogBoardPage_cards">

					<CardService/>
					<CardService/>
				</div>
			</div>
		</div>
	);
};

export default CatalogBoardPage;