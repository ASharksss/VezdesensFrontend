import React, {useMemo} from 'react';
import './card.css'

const CardDescription = ({description, characteristics}) => {
    const characteristicsContent = useMemo(() => {
        const groupedInputs = {};
        const groupedSelects = {};

        // Группируем характеристики
        characteristics.input.forEach((item) => {
            if (item.characteristic) {
                if (!groupedInputs[item.characteristic.name]) {
                    groupedInputs[item.characteristic.name] = [];
                }
                groupedInputs[item.characteristic.name].push(item.value);
            }
        });

        characteristics.select.forEach((item) => {
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
                    <div key={`adCharacteristicInputs-group=${index}`} className={'grid'}
                         style={{gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 10}}>
                        <p className={'flex items-center title_characteristic'}>{key.trim()}:</p>
                        <ul>
                            {groupedInputs[key].map((value, i) => (
                                <li key={`adCharacteristicInputs-item=${i}`}>{value}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                {Object.keys(groupedSelects).map((key, index) => (
                    <div key={`adCharacteristicSelects-group=${index}`} className={'grid'}
                         style={{gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 10}}>
                        <p className={'flex items-center title_characteristic'}>{key.trim()}:</p>
                        <ul style={{marginBottom: 5}}>
                            {groupedSelects[key].map((value, i) => (
                                <li key={`adCharacteristicSelects-item=${i}`}>{value}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </>
        )

    }, [characteristics])
    return (
        <div className='card_description'>

            <h1 className='card_description-title'>Описание</h1>
            <p className='card_description-text'>
              <pre className='card_description-pre'>{description}</pre>
            </p>
            <h1 className='card_description-title'>Характеристки</h1>
            <div className='grid'>
                {characteristicsContent}
            </div>

        </div>
    );
};

export default CardDescription;
