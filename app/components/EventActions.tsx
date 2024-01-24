"use client";

import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { Event } from "./EventItem";

interface Props {
    event: Event
    styles: {
        readonly [key: string]: string;
    }
}

const EventActions = ({event, styles}: Props) => {

    const deleteEvent = () => {
        console.log("delete")
      }

  return (
    <>
      <div className={styles.controls}>
        <Link href={`/events/edit/${event.id}`}>
          <FaPencilAlt /> Edit Event
        </Link>
        <a href="#" className={styles.delete} onClick={deleteEvent}>
          {" "}
          <FaTimes /> Delete Event
        </a>
      </div>
    </>
  );
};

export default EventActions;
