"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Event } from "./EventItem";

interface Props {
  event: Event;
}

const EventMap = ({ event }: Props) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geocode = async () => {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.attributes.address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}&country=RS&limit=1&proximity=20.457273,44.787197&types=address`
      );
      const data = await response.json();
      setLat(data.features[0].center[1]);
      setLng(data.features[0].center[0]);
      setLoading(false);
    };
    geocode();
  }, []);

  if (loading) return;

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={lng} latitude={lat}>
        <Image src="../images/pin.svg" alt="pin" width={30} height={90} />
      </Marker>
    </Map>
  );
};

export default EventMap;
