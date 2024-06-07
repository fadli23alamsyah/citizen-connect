"use client"

import mergeClass from "@/utils/class-name";
import { Cloud, Club, Moon, Star, Sun } from "@phosphor-icons/react";
import { BuildingOffice, CalendarStar, HandFist, User } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const listMenu = [
  {
    title: "Event",
    path: "/",
    icon: CalendarStar
  },
  {
    title: "Service",
    path: "/service",
    icon: BuildingOffice
  },
  {
    title: "Complaint",
    path: "/complaint",
    icon: HandFist
  },
  {
    title: "User",
    path: "/user",
    icon: User
  },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();

  useEffect(() => setMounted(true), []);

  const changeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? "dark" : "light");
  }

  return (
    <header className={
      mergeClass(
        "h-16 sticky top-0 py-2 px-4 flex justify-between items-center z-[1]",
        "bg-gray-50 dark:bg-slate-800 shadow-[0_1px_8px] shadow-black/10 dark:border-b dark:border-white/10 dark:shadow-white/10"
      )
    }>
      <h1 className="font-extrabold text-lg text-black dark:text-white">Citizen Connect</h1>
      <nav className={
        mergeClass(
          "w-full h-16 fixed bottom-0 flex -mx-4 px-2 pb-1 items-center text-slate-400/60 bg-white shadow-[0_-1px_8px]",
          "shadow-black/10 dark:bg-slate-800 dark:border-t dark:border-white/10 dark:shadow-white/10",
          "md:static md:h-fit md:m-0 md:flex-1 md:justify-end md:pr-8 md:p-0 md:gap-4 md:shadow-none md:border-none md:bg-transparent",
          "*:flex-1 *:flex *:flex-col *:h-full *:justify-center *:items-center *:text-xs *:pt-1", // child style use *:
          "md:*:flex-none md:*:tracking-widest md:*:text-sm md:*:px-2 md:*:pt-0"
        )
      }>
        {
          listMenu.map((menu, index)=>{
            return (
              <Link 
                key={`menu${index}`} 
                href={menu.path} 
                className={pathName == menu.path ? `shadow-[inset_0_4px_0_0] shadow-sky-400 text-sky-400 font-extrabold md:shadow-none` : ''}
              >
                <menu.icon 
                  size={28} 
                  weight={pathName == menu.path ? `duotone` : 'light'} 
                  className={
                    mergeClass(
                      "md:hidden",
                      pathName == menu.path ? "stroke-[6] stroke-sky-400" : ""
                    )
                  } 
                />
                <span>{menu.title}</span>
              </Link>
            );
          })
        }
      </nav>
      {mounted && <label className="group relative min-w-16 h-8 bg-sky-400 has-[:checked]:bg-slate-600 rounded-full overflow-clip cursor-pointer">
        <input type="checkbox" className="hidden peer" checked={theme == "dark"} onChange={changeTheme} />
        <div id="bg-light-switch" className="absolute left-0 top-0 right-0 bottom-0 transition duration-500 peer-checked:opacity-0">
          <Cloud size={45} weight="fill" className="absolute -bottom-3 -left-5 text-slate-100 opacity-35 scale-110" />
          <Club size={45} weight="fill" className="absolute -bottom-6 -right-2 text-slate-100 opacity-35 scale-150 rotate-45" />
          <Cloud size={45} weight="fill" className="absolute -bottom-5 -left-5 text-white drop-shadow-[0_-1px_2px_#c2cfce] scale-110" />
          <Club size={45} weight="fill" className="absolute -bottom-8 -right-2 text-white drop-shadow-[0_-1px_2px_#c2cfce] scale-150 rotate-45" />
        </div>
        <div id="bg-dark-switch" className="absolute left-0 top-0 right-0 bottom-0 opacity-0 transition duration-500 peer-checked:opacity-100">
          <Star size={5} weight="fill" className="absolute top-2 left-2 text-white drop-shadow-sm" />
          <Star size={3} weight="fill" className="absolute bottom-2 right-9 text-white drop-shadow-sm" />
          <Star size={8} weight="fill" className="absolute top-3 left-4 text-white drop-shadow-sm" />
          <Star size={2} weight="fill" className="absolute bottom-2 left-3 text-white drop-shadow-sm" />
        </div>
        <span className={
          mergeClass(
            "absolute h-7 w-7 rounded-full",
            "top-[2px] left-[2px] bg-[#ffad42] transition-all duration-500",
            "peer-checked:bg-gray-300 peer-checked:left-[34px]",
            "before:absolute before:h-7 before:w-7 before:rounded-full before:scale-0",
            "before:transition-all before:delay-0 before:duration-500 before:opacity-0",
            "peer-checked:before:shadow-[0_0_3px_2px_rgba(209,213,219,0.5),0_0_0_8px_rgba(209,213,219,0.1),0_0_0_16px_rgba(209,213,219,0.08),0_0_0_24px_rgba(209,213,219,0.06)]",
            "peer-checked:before:scale-100 peer-checked:before:opacity-100",
            "after:absolute after:top-0 after:left-0 after:h-7 after:w-7 after:rounded-full after:scale-100",
            "after:transition-all after:delay-0 after:duration-500 after:opacity-100",
            "after:shadow-[0_0_3px_2px_rgba(255,173,66,0.6),0_0_0_8px_rgba(255,173,66,0.2),0_0_0_16px_rgba(255,173,66,0.1),0_0_0_24px_rgba(255,173,66,0.08)]",
            "peer-checked:after:scale-0 peer-checked:after:opacity-0",
          )
        }>
          <div className="relative h-full w-full rounded-full flex justify-center items-center text-white overflow-hidden">
            <Sun 
              size={20} 
              weight="fill" 
              className="absolute transition ease-in-out duration-200 delay-200 group-has-[:checked]:translate-y-7"
            />
            <Moon 
              size={20} 
              weight="fill" 
              className="absolute transition ease-in-out -translate-y-7 duration-200 delay-200 group-has-[:checked]:translate-y-0" 
            />
          </div>
        </span>
        <div className="absolute left-0 top-0 right-0 bottom-0 rounded-full transition duration-500 shadow-[inset_0_0_2px_1px_#c4e1f5] peer-checked:shadow-[inset_0_0_2px_1px_#021a29]"></div>
      </label>}
    </header>
  );
}