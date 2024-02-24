import { API_URL } from '@/config';
import { EventItem } from '../components';
import { Event } from '../components/EventItem';

const EventsPage = async () => {

  const response = await fetch(`${API_URL}/api/events?populate=*&sort=date:asc`, {
    next: { revalidate: 1 },
  });
  const apiResponse = await response.json();
  const events: Event[] = apiResponse.data;

  return (
    <div>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  )
}

export default EventsPage