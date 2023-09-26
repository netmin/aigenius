"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Евгений",
    avatar: "J",
    title: "Разработчик",
    description: "Это лучший сервис, который я когда-либо использовал!",
  },
  {
    name: "Антон",
    avatar: "A",
    title: "Дизайнер",
    description: "Я пользуюсь каждый день для создания новых фотографий!",
  },
  {
    name: "Марк",
    avatar: "M",
    title: "Менеджер",
    description: "Это приложение изменило мою жизнь, не могу представить работу без него!",
  },
  {
    name: "Maрия",
    avatar: "M",
    title: "Копирайтер",
    description: "Лучшее в своем классе, определенно стоит премиум подписки!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Отзывы</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}