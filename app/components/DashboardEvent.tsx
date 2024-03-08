"use client";

import React from 'react'
import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import styles from "@/app/styles/DashboardEvent.module.css"
import { Event } from './EventItem'

interface Props {
    event: Event["attributes"]
}

const DashboardEvent = ({event}: Props) => {

    console.log(event)

    const deleteEvent = (id?: number): void => {
        console.log(id)
      }

  return (
    <div className={styles.event}>
        <h4>

        <Link href={`/events/${event.id}`}>{event.name}</Link>
        </h4>
        <Link href={`/events/edit/${event.id}`} className={styles.edit}>
            <FaPencilAlt /> <span>Edit Event</span>
        </Link>
        <Link href="#" className={styles.delete} onClick={() => deleteEvent(event.id)}>
            <FaTimes /> <span>Delete Event</span>
        </Link>
    </div>
  )
}

export default DashboardEvent