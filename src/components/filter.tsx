"use client"

import { LocationContextType, useGeolocation } from "@/contexts/location-context";
import mergeClass from "@/utils/class-name";
import { CaretDown, MapPin } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type ProvType = {
  id: string,
  name: string,
}

type RegType = {
  id: string,
  province_id: string,
  name: string,
}

export default function Filter() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [regencies, setRegencies] = useState<String[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const { location, setLocation, setIsAllowGeo } = useGeolocation() as LocationContextType;

  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then((provincesRes) => {
        let regencies : string[] = [];
        provincesRes.map((prov: ProvType) => {
          fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`)
            .then((res) => res.json())
            .then((regenciesRes) => {
              regenciesRes.map((reg: RegType) => regencies.push(reg.name))
            })
        })
        setRegencies(regencies);
      });

    setMounted(true);

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, [])

  useEffect(() => {
    if(localStorage.getItem("locationType") === "auto") {
      setSelected("Lokasi anda");
    } else if (localStorage.getItem("locationName")) {
      setSelected(localStorage.getItem("locationName")!);
    }
  }, [regencies])

  useEffect(() => {
    if (location.name != null && location.type == "auto" && location.name != selected) setSelected("Lokasi anda");
  }, [location, selected])

  const handleClick = (event: any) => {
    if(!event.target.closest("#filter-select")) setOpen(false);
  }

  const handleSelected = (event: any) => {
    if(event.target.innerText !== "Lokasi anda") {
      setSelected(event.target.innerText);
      setLocation({
        name: event.target.innerText,
        type: "static",
      });
      setIsAllowGeo(false);
    } else {
      setIsAllowGeo(true);
    }
    setSearch("");
    setOpen(false);
  }

  return (
    <div className={
      mergeClass(
        "sticky top-16 py-2 px-3 -mx-3 mb-5 flex flex-wrap justify-between items-center bg-gray-50 dark:bg-slate-800",
        "shadow-[0_1px_8px] shadow-black/10 dark:border-b dark:border-white/10 dark:shadow-white/10 text-left"
      )
    }>
      <h6>Filter</h6>
      <div id="filter-select" className="relative select-none">
        {!mounted && <div className="absolute w-full h-full z-[2] top-0 left-0 rounded-md overflow-hidden bg-gray-50 dark:bg-slate-800">
          <div className="animate-pulse w-full h-full bg-slate-200 dark:bg-slate-700"></div>
        </div>}
        <div 
          className={
            mergeClass(
              "w-48 flex divide-x items-center cursor-pointer rounded-md ring-1 ring-inset ring-black/10",
              "dark:ring-white/10 dark:divide-white/10"
            )
          }
          onClick={() => setOpen(!open)}
        >
          <p className="px-2 flex-1 line-clamp-1 font-mono" title={selected || "Pilih lokasi"}>
            {selected.replace(/W*(Kabupaten|kota)/gi, "").trim() || "Pilih lokasi"}
          </p>
          <span>
            <CaretDown size={32} className={`p-2 transition ${open ? "rotate-180" : "rotate-0"}`} />
          </span>
        </div>
        <div 
          id="option-filter"
          className={
            mergeClass(
              "absolute top-full w-full flex flex-col mt-1 rounded-md bg-gray-50 dark:bg-slate-800 overflow-hidden",
              "transition-all ease-in-out duration-300 ring-1 ring-inset ring-black/10 dark:ring-white/10",
              "shadow-[0_1px_8px] shadow-black/10 dark:shadow-white/10",
              open ? "max-h-60" : "max-h-0"
            )
          }
        >
          <input 
            className="w-full rounded-t-md bg-slate-200 p-2 text-sm outline-none text-slate-900" 
            placeholder="Masukkan nama lokasi" 
            type="text" 
            onChange={(event) => setSearch(event.target.value.toLowerCase())}
            value={search}
          />
          <div className="w-full max-h-full flex flex-col gap-1 py-1 text-sm overflow-y-auto *:p-1 *:cursor-pointer hover:*:bg-black/10 dark:hover:*:bg-white/10">
            <span 
              className={
                mergeClass(
                  "flex gap-2 font-bold",
                  selected === "Lokasi anda" ? "bg-black/10 dark:bg-white/10" : ""
                )
              } 
              onClick={handleSelected}
            >
              <MapPin size={20} weight="bold" />
              Lokasi anda
            </span>
            {
              regencies.map((regency, index)=> (
                <span 
                  key={index}
                  className={
                    mergeClass(
                      regency.toLowerCase().includes(search) ? "block" : "hidden",
                      selected.toLowerCase() === regency.toLowerCase() ? "bg-black/10 dark:bg-white/10" : "",
                    )
                  }
                  onClick={handleSelected}
                >
                  {regency}
                </span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}