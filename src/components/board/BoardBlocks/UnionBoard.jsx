import React from 'react';
import SmallBlocks from "./SmallBlocks";
import CommercialBlocksLss from "./CommercialBlocksLSS";

const UnionBoard = ({blockData, commercialData}) => {
	if (blockData === undefined) blockData = []
	if (commercialData === undefined) commercialData = []
	const handleGetData = () => {
		const combinedData = [];
		const smallBlocksCount = 3;
		const commercialBlocksCount = 2;

		for (let i = 0; i < Math.max(blockData.length, commercialData.length); i++) {
			const commercialIndex = i - smallBlocksCount;
			if ((i % (smallBlocksCount + commercialBlocksCount) < smallBlocksCount)) {
				combinedData.push(
					<SmallBlocks key={`blocks-${i}`} items={blockData[i]} />
				);
			} else {
				if (commercialIndex < commercialData.length) {
					combinedData.push(
						<CommercialBlocksLss key={`commercial-${i}`} items={commercialData[commercialIndex]} />
					);
				}
			}
			if (i % 4 === 0 || i % 3 === 0) {
				combinedData.push(
					<SmallBlocks key={`blocks-${i}-${Math.floor(Math.random(1, 990) * 100)}`} items={blockData[i]} />
				);
			}
		}
		return combinedData;
	};

	return <>{handleGetData()}</>;
};

export default UnionBoard;