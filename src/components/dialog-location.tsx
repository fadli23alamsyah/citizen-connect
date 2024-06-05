"use client"

import { useEffect, useRef } from "react";
import Dialog, { DialogRef } from "./dialog";
import mergeClass from "@/utils/class-name";
import { LocationContextType, useGeolocation } from "@/contexts/location-context";

export default function DialogLocation() {
  const { location, error, isAllowGeo, setIsAllowGeo } = useGeolocation() as LocationContextType;
  const locationDialog = useRef<DialogRef>(null);

  useEffect(() => {
    if(!localStorage.getItem("isAllowGeolocation")) locationDialog.current?.open();
  }, [])

  useEffect(() => {
    if (isAllowGeo == false && error != null) {
      locationDialog.current?.open();
    }
  }, [isAllowGeo, error]);

  useEffect(() => {
    if(location.name != null) {
      localStorage.setItem("locationName", location.name);
      localStorage.setItem("locationType", location.type);
    }
  }, [location]);

  const locationHandler = () => {
    if (!localStorage.getItem("isAllowGeolocation")) setIsAllowGeo(true);
    locationDialog.current?.close();
  }

  return (
    <Dialog 
      ref={locationDialog}
      className="w-full md:w-96"
      outsideable={false}
    >
      <h1 className="font-bold text-center">{error ? "Peringatan" : "Aktifkan Lokasi"}</h1>
      <hr className="my-2" />
      <p>
        {error || "Izinkan mengaktifkan lokasi untuk mendapatkan infomasi terupdate sesuai lokasi anda saat ini"}
      </p>
      <button 
        className={
          mergeClass(
            "block mx-auto my-4 px-5 py-1 outline-none border-2 dark:border-white rounded-lg",
            "bg-sky-400 text-white font-bold"
          )
        }
        onClick={locationHandler}
      >
        {error ? "Ok" : "Izinkan"}
      </button>
    </Dialog>
  );
}