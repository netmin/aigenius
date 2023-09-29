
import React from "react";



const TermsComponent = () => {
    const termsSections = [
        {
            title: 'Условия предоставления услуг',
            details: [
                {subtitle: 'Описание Сервиса', content: 'AIGenius предоставляет пользователям доступ к эксклюзивным ресурсам, инструментам и услугам в области искусственного интеллекта.'},
                {subtitle: 'Стоимость и Оплата', content: 'Подписка на AIGenius стоит 499 рублей в месяц, включая все применимые налоги. Оплата производится ежемесячно, и подписка автоматически продлевается, если не будет отменена.'},
                {subtitle: 'Сроки и Отмена Подписки', content: 'Пользователи могут отменить подписку в любой момент через настройки аккаунта. Возврат средств за неиспользованный период подписки не предусмотрен.'},
                {subtitle: 'Ограничение Ответственности', content: 'AIGenius не несет ответственности за убытки, возникшие в результате использования или невозможности использования сервиса.'},
                {subtitle: 'Конфиденциальность и Защита Данных', content: 'AIGenius строго соблюдает правила конфиденциальности и защиты данных пользователей.'}
            ]
        },
        {
            title: 'Процедура возврата/отказа от покупки',
            details: [
                {subtitle: 'Условия Возврата', content: 'Возврат средств возможен только при наличии технических проблем со стороны сервиса, которые не могут быть устранены в течение разумного срока.'},
                {subtitle: 'Процесс Возврата', content: 'Для запроса возврата, пользователь должен обратиться в службу поддержки через электронную почту или чат на сайте. AIGenius рассмотрит запрос в течение 7 рабочих дней.'},
                {subtitle: 'Ограничения и Исключения', content: 'Возврат средств не предусмотрен, если пользователь сам решит прекратить использование сервиса или нарушит Условия использования сервиса.'}
            ]
        }
    ];
    return (
        <div>
            <h1>Условия и правила</h1>
            {termsSections.map((section, index) =>
                <section key={index}>
                    <h2>{section.title}</h2>
                    <dl>
                        {section.details.map((detail, idx) =>
                            <React.Fragment key={idx}>
                                <dt><strong>{detail.subtitle}</strong></dt>
                                <dd>{detail.content}</dd>
                            </React.Fragment>
                        )}
                    </dl>
                </section>
            )}
        </div>
    );
}

export default TermsComponent