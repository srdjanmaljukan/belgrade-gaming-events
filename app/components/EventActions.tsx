"use client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { Event } from "./EventItem";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

interface Props {
    event: Event
    styles: {
        readonly [key: string]: string;
    }
}

const EventActions = ({event, styles}: Props) => {

  const router = useRouter();

    const deleteEvent = async () => {
        if (confirm("Are you sure?")) {
          const res = await fetch(`${API_URL}/api/events/${event.id}`, {
            method: "DELETE"
          })

          const data = await res.json()

          if (!res.ok) {
            toast.error(data.message)
          } else {
            router.push("/events");
          }
        }
      }

  return (
    <>
      <div className={styles.controls}>
      <ToastContainer />
        <Link href={`/events/edit/${event.id}`}>
          <FaPencilAlt /> Edit Event
        </Link >
        <Link href="#" className={styles.delete} onClick={deleteEvent}>
          {" "}
          <FaTimes /> Delete Event
        </Link>
      </div>
    </>
  );
};

export const dynamic = "force-dynamic"

export default EventActions;
