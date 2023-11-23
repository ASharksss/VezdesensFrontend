import React from 'react';
import SmallBlocks from "./SmallBlocks";
import CommercialBlocksLss from "./CommercialBlocksLSS";

const UnionBoard = ({blockData, commercialData}) => {
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
				if (blockData[i].length < 5) {
					combinedData.push(
						<CommercialBlocksLss key={`commercial-${i}`} items={commercialData[commercialIndex-1]} />
					);
				}
			} else {
				if (commercialIndex < commercialData.length) {
					combinedData.push(
						<CommercialBlocksLss key={`commercial-${i}`} items={commercialData[commercialIndex]} />
					);
				}
				if (blockData[i].length > 0 && (i % 3 === 0 && i % 4 === 0)) {
					combinedData.push(
						<SmallBlocks key={`blocks-${i}`} items={blockData[i]} />
					);
				}
			}
		}
		return combinedData;
	};

	return <>{handleGetData()}</>;
};

export default UnionBoard;