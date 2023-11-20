import React, {useEffect, useState} from 'react';
import MyAd from "./myAd";
import axios from "axios";

const MyFavorite = ({dataUser}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getFavorite = async () => {
      setLoading(true)
      await axios.get('api/user/getFavorite')
        .then((res) => {
          setData(res.data)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setData([])
          setLoading(false)
        })
    }
    getFavorite()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  } else {
    return (
      <div>
        <select className='favorite_filter'>
          <option>Категория 1</option>
          <option>Категория 2</option>
          <option>категория 3</option>
        </select>
        <div className="ads">
          {data.map((item, index) => (<MyAd key={'active' + index} typeAd={'favoriteAd'} item={item.ad}/>))}
        </div>
      </div>
    );
  }
};

export default MyFavorite;