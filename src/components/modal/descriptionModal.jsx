import React, {useMemo} from 'react';
import './modal.css'

const DescriptionModal = ({adCharacteristicSelects, adCharacteristicInputs, description}) => { // приходят вместе с данными карты
  // adCharacteristicInputs: [{id: int, value: str, characteristic: {name: str}}]
  // adCharacteristicSelects: [{id: int, characteristic: {name: str}, characteristicValue: {name: str}}]
  const content = useMemo(() => {
    const groupedInputs = {};
    const groupedSelects = {};

    // Группируем характеристики
    adCharacteristicInputs.forEach((item) => {
      if (item.characteristic) {
        if (!groupedInputs[item.characteristic.name]) {
          groupedInputs[item.characteristic.name] = [];
        }
        groupedInputs[item.characteristic.name].push(item.value);
      }
    });

    adCharacteristicSelects.forEach((item) => {
      if (item.characteristic) {
        if (!groupedSelects[item.characteristic.name]) {
          groupedSelects[item.characteristic.name] = [];
        }
        groupedSelects[item.characteristic.name].push(item.characteristicValue?.name);
      }
    });

    // Выводим группированные данные
    return (
      <>
        {Object.keys(groupedInputs).map((key, index) => (
          <div key={`adCharacteristicInputs-group=${index}`} className={'grid'} style={{gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 10}}>
            <p className={'flex items-center'}>{key.trim()}:</p>
            <ul>
              {groupedInputs[key].map((value, i) => (
                <li key={`adCharacteristicInputs-item=${i}`}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
        {Object.keys(groupedSelects).map((key, index) => (
          <div key={`adCharacteristicSelects-group=${index}`} className={'grid'} style={{gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 10}}>
            <p className={'flex items-center'}>{key.trim()}:</p>
            <ul style={{marginBottom: 5}}>
              {groupedSelects[key].map((value, i) => (
                <li key={`adCharacteristicSelects-item=${i}`}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </>
    )

  }, [adCharacteristicInputs, adCharacteristicSelects])

  return (
    <div className='description_modal'>
      <h1 className='description_modal-title'>Описание</h1>
      <p>
        <pre className='description_modal-text'>{description}</pre>
      </p>
      <br/>
      <h1 className='description_modal-title'>Характеристики</h1>
      <p className='description_modal-text'>
        {content}
      </p>
    </div>
  );
};

export default DescriptionModal;