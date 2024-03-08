import React from "react";
import { API_URL } from "@/config";
import { cookies } from "next/headers";
import styles from "@/app/styles/Dashboard.module.css"
import { Event } from "@/app/components/EventItem";
import DashboardEvent from "@/app/components/DashboardEvent";

const DashboardPage = async () => {
  const token = cookies().get("token") ? cookies().get("token")?.value : "" 

  const res = await fetch(`${API_URL}/api/my-events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events: Event["attributes"][] = await res.json();

  return (
    <div className={styles.dash}>
      <h1>Dashboard</h1>
      <h3>My Events</h3>
      {events.map((event) => (
        <DashboardEvent key={event.id} event={event} />
      ))}
    </div>
  );
};

export default DashboardPage;
