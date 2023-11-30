import React, {useEffect, useRef, useState} from 'react';
import CardService from "../components/cards/CardService";
import CategoryAccordion from "../components/categoryAccordion/categoryAccordion";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryList} from "../redux/slices/categorySlice";
import axios from "axios";
import {encryptArrayWithKey} from "../utils";


const ServicePage = () => {


  return (
    <div>
      <CategoryAccordion/>
      <CardService/>
    </div>
  );
};

export default ServicePage;