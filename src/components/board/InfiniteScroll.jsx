import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchAllAds} from "../../redux/slices/boardSlice";

export const InfiniteScroll = ({children}) => {
  const [isFetching, setIsFetching] = useState(false);
  const {ads} = useSelector(state => state.ads)
  const dispatch = useDispatch()

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
        // Достигнут конец страницы
        console.log("Конец страницы достигнут!");
        // Здесь вы можете выполнить необходимые действия, например, загрузить дополнительные данные
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div>{children}</div>;
}
