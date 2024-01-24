import Showcase from "./Showcase";
import { API_URL } from "@/config";
import { Event } from "./components/EventItem";
import { EventItem } from "@/app/components";
import Link from "next/link";

export default async function Home() {
  const response = await fetch(`${API_URL}/api/events`, {
    next: { revalidate: 1 },
  });
  const events: Event[] = await response.json();

  return (
    <main>
      <Showcase />
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      {events.length > 0 && <Link href="/events" className="btn-secondary">View All Events</Link>}
    </main>
  );
}
