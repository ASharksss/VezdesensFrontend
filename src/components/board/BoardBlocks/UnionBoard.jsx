import React, { useMemo } from 'react';
import SmallBlocks from "./SmallBlocks";
import CommercialBlocksLss from "./CommercialBlocksLSS";

const UnionBoard = ({ blockData, commercialData }) => {
	const handleGetData = useMemo(() => {
		const combinedData = [];
		const smallBlocksCount = 3;
		const commercialBlocksCount = 2;

		for (let i = 0; i < Math.max(blockData.length, commercialData.length); i++) {
			if ((i % (smallBlocksCount + commercialBlocksCount) < smallBlocksCount)) {
				combinedData.push(
					<SmallBlocks key={`blocks-${i}`} items={blockData[i]} />
				);
			} else {
				// Render CommercialBlocksLss two times
				const commercialIndex = i - smallBlocksCount;
				if (commercialIndex < commercialData.length) {
					combinedData.push(
						<CommercialBlocksLss key={`commercial-${i}`} items={commercialData[commercialIndex]} />
					);
				}
				if (blockData[i].length > 0) {
					combinedData.push(
						<SmallBlocks key={`blocks-${i}`} items={blockData[i]} />
					);
				}
			}
		}
		return combinedData;
	}, [blockData, commercialData]);

	return <>{handleGetData}</>;
};

export default UnionBoard;