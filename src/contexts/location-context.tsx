"use client"

import DialogLocation from "@/components/dialog-location";
import React, { createContext, useContext, useEffect, useState } from "react";

type LocationType = {
  name: string | null,
  type: "auto" | "static"
}

export type LocationContextType = {
  location: LocationType,
  setLocation: React.Dispatch<LocationType>,
  error: string | null,
  isAllowGeo: boolean | null,
  setIsAllowGeo: React.Dispatch<boolean>;
};

type LocationProviderType = {
  children : React.ReactNode
}

const LocationContext = createContext<LocationContextType | null>(null);

export default function LocationProvider({ children } : LocationProviderType) {
  const [isAllowGeo, setIsAllowGeo] = useState<boolean | null>(null);
  const [location, setLocation] = useState<LocationType>({name: null, type: "static"});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      if (localStorage.getItem("isAllowGeolocation") == "true" && localStorage.getItem("locationType") == "auto") {
        setIsAllowGeo(true);
      } 
    } else {
      setError("Browser tidak mendukung Geolocation");
    }
  }, [])

  useEffect(() => {
    if (isAllowGeo) {
      localStorage.setItem("isAllowGeolocation", "true");
      navigator.permissions.query({name: "geolocation"})
      .then((permissionStatus) => {
        if(permissionStatus.state === "denied") {
          localStorage.setItem("isAllowGeolocation", "false");
          setIsAllowGeo(false);
          setError("Geolocation tidak diizinkan, silahkan ubah di pengaturan browser");
        } else {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getCityName(latitude, longitude);
          }, (error) => {
            localStorage.setItem("isAllowGeolocation", "false");
            setIsAllowGeo(false);
            setError(error.message);
          });
        }
      })
    }
  }, [isAllowGeo])

  function getCityName(lat: number, long: number) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
    .then(response => response.json())
    .then(coordinateInfo => setLocation({name: coordinateInfo.city, type: "auto"}));
  }

  return (
    <LocationContext.Provider value={{ location , setLocation, error, isAllowGeo, setIsAllowGeo }}>
      {children}
      <DialogLocation />
    </LocationContext.Provider>
  );
}

export const useGeolocation = ()  => useContext(LocationContext);
