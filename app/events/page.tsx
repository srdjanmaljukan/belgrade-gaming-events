import { API_URL } from "@/config";
import { EventItem } from "../components";
import { Event } from "../components/EventItem";
import Link from "next/link";

const PER_PAGE = 2;

interface Props {
  searchParams: { page: string };
}

const EventsPage = async ({ searchParams: { page = "1" } }: Props) => {
  const response = await fetch(
    `${API_URL}/api/events?populate=*&sort=date:asc&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`,
  );
  const apiResponse = await response.json();
  const events: Event[] = apiResponse.data;

  const lastPage = Math.ceil(events.length / PER_PAGE)

  return (
    <div>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}></Link>
      )}
    </div>
  );
};

export default EventsPage;
