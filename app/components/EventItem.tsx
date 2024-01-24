import React from "react";
import styles from "@/app/styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

export interface Event {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image: string;
}

interface Props {
  event: Event;
}

const EventItem = ({ event }: Props) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={event.image ? event.image : "/images/event-default.png"}
          width={170}
          height={100}
          alt="event-image"
        />
      </div>
      <div className={styles.info}>
        <span>{event.date} at {event.time}</span>
        <h3>{event.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.slug}`} className="btn">Details</Link>
      </div>
    </div>
  );
};

export default EventItem;
