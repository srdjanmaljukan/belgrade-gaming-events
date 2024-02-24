"use client";

import React from "react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

export interface Image {
  data: null | {
    id: string;
    attributes: {
      name: string;
      formats: {
        thumbnail: {
          url: string;
        };
        medium: {
          url: string;
        };
      };
    };
  };
}

interface Props {
  imageURL: "/images/event-default.png" | string;
  width: number;
  height: number;
}

const EventImage = ({ imageURL, width, height }: Props) => {
  if (imageURL === "/images/event-default.png") {
    return (
      <Image src={imageURL} width={width} height={height} alt="event-image" />
    );
  } else {
    return (
    <CldImage src={imageURL} width={width} height={height} alt="event-image" />
    )
  }
};

export default EventImage;
