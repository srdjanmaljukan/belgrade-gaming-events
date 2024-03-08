import React from "react";
import styles from "@/app/styles/EventItem.module.css";
import EventImage, { Image } from "./EventImage";
import Link from "next/link";

export interface Event {
  id: string;
  attributes: {
    id?: number
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    image: Image;
  };
}

interface Props {
  event: Event;
}

const EventItem = ({ event }: Props) => {

  const imageURL = event.attributes.image.data?.attributes?.formats.thumbnail.url || "/images/event-default.png"

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <EventImage imageURL={imageURL} width={170} height={100} />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(event.attributes.date).toLocaleDateString("en-gb")} at {event.attributes.time}
        </span>
        <h3>{event.attributes.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.id}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
