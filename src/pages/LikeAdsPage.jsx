import React, {useState, useEffect} from 'react';
import {group} from "../utils";

const testData = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6']
const testGroupData = [['test1', 'test2', 'test3'], ['test4', 'test5', 'test6']]
const LikeAdsPage = () => {
  const [data, setData] = useState(testData)
  const [groupData, setGroupData] = useState(testGroupData)
  const handleNewElement = (event) => {
    setData(prevState => [...prevState, `test${Math.floor(Math.random()*1000)}`])
  }
  useEffect(() => {
    const groupedData = group(data, 3, data.length)
    setGroupData([...groupedData])
  }, [data])
  return (
    <div className='flex' style={{flexDirection: 'column'}}>
      <button onClick={handleNewElement}>new</button>
      {groupData.map((group, groupIndex) => (
          <div className='flex' key={groupIndex} style={{alignItems: 'center',justifyContent: 'space-around'}}>
            {group.map((item, itemIndex) => (
                <p style={{marginRight: '15px'}} key={itemIndex}>{item}</p>
            ))}
          </div>
      ))}
    </div>
  );
};

export default LikeAdsPage;