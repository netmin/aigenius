"use client";

import Link from "next/link";
import Image from "next/image";
import {Montserrat} from "next/font/google";
import {cn} from "@/lib/utils";
import {Code, ImageIcon, LayoutDashboard, MessagesSquare, MusicIcon, Phone, Settings, VideoIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import {FreeCounter} from "@/components/free-counter";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });


const routes = [
    {
        label: "Панель управления",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Диалоги",
        icon: MessagesSquare,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Текст в картинку",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    {
        label: "Текст в видео",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
    },
    {
        label: "Текст в музыку",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500",
    },
    {
        label: "Генерация кода",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    },
    {
        label: "Настройки",
        icon: Settings,
        href: "/settings",
    },
        {
        label: "Контакты и правила",
        icon: Phone,
        href: "/contacts",
    }
]

interface SidebarProps {
    apiLimitCount: number
}

export const Sidebar = ({apiLimitCount = 0}: SidebarProps) => {
    const pathname = usePathname()
    return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            AIGenius
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter
        apiLimitCount={apiLimitCount}
      />
    </div>
  );
};
