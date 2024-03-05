import MyAd from "./myAd";

const ArchiveAd = ({dataUser, setDataAds, loading, status}) => {

	if (loading) {
		return (
			<div>
				Загрузка...
			</div>
		)
	}
  return (
    <div>
      {dataUser.ads.length === 0 || status === false ? <p className="flex jy-center items-center h-200">Ничего нет</p>
        :  dataUser.ads.map((item, index) => (
					<MyAd key={'archive' + index} typeAd={'archiveAd'} item={item.statusAdId === 4 && item} setDataAds={setDataAds}/>
				))}
    </div>
  );
};

export default ArchiveAd;