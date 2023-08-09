import React from 'react';
import Button from "../../ui/buttons/button";

const CardDescription = ({card_number, card_time, card_views}) => {
    return (
        <div className='card_description'>
            <p className='number_time_views'>{card_number + ' · ' + card_time + ' · ' + card_views + ' просмотров'}</p>
            <h1 className='card_description-title'>Описание</h1>
            <p className='card_description-text'>
                iPhone 14 pro max + Фирменный подарок! <br/>
                ГАРАНТИЯ !<br/>
                КРЕДИТ БЕЗ ПЕРВОНАЧАЛЬНОГО ВЗНОСА !<br/>
                Абсолютно новый ( НЕ ВОССТАНОВЛЕННЫЙ ) в заводской упаковке iPhone 14 Pro Max Deep Purple !<br/>
                🌐🌐🌐🌐🌐<br/>
                📱MQ993J/A<br/>
                1 физическая сим-карта и 2 е-сим<br/>
                🌐🌐🌐🌐🌐<br/>
                ▪️ОПЛАТА:💵Наличный расчёт<br/>
                📲Перевод с карты на карту СБП💳 Безналичный расчёт ( Через терминал + 1.5% к стоимости )⏳А также можно
                приобрести в кредит через банки . ( Условия: паспорт РФ, прописка )<br/>
                🧑🏻‍💻Работаем с ЮР лицами и ИП ❗️БЕЗ НДС❗️<br/>
            </p>
            <div className="flex jy-end">
            <Button classname={'stroke'} children={'Показать еще'}/>

            </div>

        </div>
    );
};

export default CardDescription;