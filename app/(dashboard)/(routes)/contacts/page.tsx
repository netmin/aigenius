import {Phone, Settings} from "lucide-react";
import Heading from "@/components/heading";
import React from "react";


const SettingsPage = async () => {
    	const bankDetails = [
        {title: 'Счет получателя в банке получателя', value: '40817810217066044511'},
        {title: 'Наименование Банка получателя', value: 'Филиал № 7806 Банка ВТБ (ПАО)'},
        {title: 'БИК Банка получателя', value: '044030707'},
        {title: 'ИНН Банка получателя', value: '7702070139'},
        {title: 'КПП Банка получателя', value: '783543012'},
        {title: 'К/С Банка получателя', value: '30101810240300000707'},
        {title: 'Получатель', value: 'Ларина Екатерина Александровна'}
    ];

    return (
        <div>
            <Heading
                title="Контакты"
                description="Реквизиты и контакты"
                icon={Phone}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                 <h1>Контакты</h1>
                <div className="text-muted-foreground text-sm">
                    <p><strong>Email:</strong> aigenius-help@proton.me</p>
                </div>

                 <h1>Реквизиты</h1>
                <div className="text-muted-foreground text-sm">
                    <dl>
                    {bankDetails.map((detail, index) => (
                        <React.Fragment key={index}>
                            <dt><strong>{detail.title}</strong></dt>
                            <dd>{detail.value}</dd>
                        </React.Fragment>
                    ))}
                </dl>

                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
