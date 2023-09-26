"use client";

import {ArrowRight, Code, ImageIcon, MessagesSquare, MusicIcon, Settings, VideoIcon} from "lucide-react";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";

const tools = [
    {
        label: "Диалоги",
        icon: MessagesSquare,
        href: "/conversation",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10"
    },
    {
        label: "Текст в картинку",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
        bgColor: "bg-pink-700/10"
    },
    {
        label: "Текст в видео",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
        bgColor: "bg-orange-700/10"
    },
    {
        label: "Текст в музыку",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
    },
    {
        label: "Генерация кода",
        icon: Code,
        href: "/code",
        color: "text-green-700",
        bgColor: "bg-green-700/10"
    },
    {
        label: "Настройки",
        icon: Settings,
        href: "/settings",
    }
]
const DashboardPage = () => {
    const router = useRouter()
    return (
        <div className="mb-8 space-y-4">
           <h2 className="text-2xl md:text-4xl font-bold text-center">
               Исследуйте мощь ИИ
           </h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
               Общайтесь с самым умным ИИ - Почувствуйте мощь искусственного интеллекта
            </p>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage