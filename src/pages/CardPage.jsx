import React, {useEffect, useState} from 'react';
import Ad from "../components/cards/Ad";
import BreadCrumbs from "../components/breadcrumbs/BreadCrumbs";
import CardAd from "../components/card/CardAd";
import {getStaticAd, STATIC_HOST} from "../utils";
import {Helmet} from "react-helmet";

const CardPage = () => {
    const [staticAd, setStaticAd] = useState([])
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [forbidden, setForbidden] = useState('')
    useEffect(() => {
        getStaticAd(1, setStaticAd)
    }, [])

    if (forbidden !== ''){
      return <div><span style={{color: 'red'}}>{forbidden}</span></div>
    }
    return (
      <div className='container'>
        <Helmet>
          <meta name='keywords' content={data.ad?.title}/>
          <meta name='description' content={data.ad?.description}/>
        </Helmet>
          {staticAd[0]?.imageName && <Ad image={`${STATIC_HOST}/promotion/${staticAd[0]?.imageName}`} href={staticAd[0]?.href}/>}
          <div className="wrapper">
              {isLoading && <BreadCrumbs crumbs={data.ad.object}/>}
              <CardAd data={data} setData={setData} isLoading={isLoading} setIsLoading={setIsLoading} setForbidden={setForbidden}/>
          </div>
      </div>
    );
};

export default CardPage;
