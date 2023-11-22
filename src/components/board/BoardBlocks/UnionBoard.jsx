import React, {useEffect} from 'react';
import SmallBlocks from "./SmallBlocks";
import CommercialBlocksLss from "./CommercialBlocksLSS";

let counter = 0

const UnionBoard = ({allAdsData}) => {
	useEffect(() => {
		counter = 0
		allAdsData.map(() => counter ++)
	}, [allAdsData])


	return allAdsData.map((arrays, index) => {
		return <>
			<SmallBlocks
				key={`blocks-${index}`}
				items={arrays}
			/>
			{arrays[0].typeAdId === 2 ?
				<CommercialBlocksLss key={`commercial-${index}`} items={arrays}/> : null}
		</>
	});
};

export default UnionBoard;