"use client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import styles from "@/app/styles/DashboardEvent.module.css"
import { Event } from './EventItem'
import { API_URL } from '@/config';

interface Props {
    event: Event["attributes"];
    token: string | undefined
}

const DashboardEvent = ({event, token}: Props) => {

    const router = useRouter()

    const deleteEvent = async (id?: number) => {
        if (confirm("Are you sure?")) {
            const res = await fetch(`${API_URL}/api/events/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
  
            const data = await res.json()
  
            if (!res.ok) {
              toast.error(data.message)
            } else {
              router.refresh();
            }
          }
      }

  return (
    <div className={styles.event}>
        <ToastContainer />
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