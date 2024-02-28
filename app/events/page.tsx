import { API_URL } from "@/config";
import { EventItem } from "../components";
import { Event } from "../components/EventItem";
import Pagination from "../components/Pagination";

const PER_PAGE = 5;

interface Props {
  searchParams: { page: string };
}

const EventsPage = async ({ searchParams: { page = "1" } }: Props) => {
  const response = await fetch(
    `${API_URL}/api/events?populate=*&sort=date:asc&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`, {next: {revalidate: 1}}
  );
  const apiResponse = await response.json();
  const events: Event[] = apiResponse.data;

  const lastPage = apiResponse.meta.pagination.pageCount;

  return (
    <div>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      <Pagination page={+page} lastPage={lastPage} />
    </div>
  );
};

export default EventsPage;
