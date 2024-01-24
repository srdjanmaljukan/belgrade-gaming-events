import EventActions from "@/app/components/EventActions";
import { Event } from "@/app/components/EventItem";
import styles from "@/app/styles/Event.module.css";
import { API_URL } from "@/config";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

const EventPage = async ({ params }: Props) => {
  const response = await fetch(`${API_URL}/api/events/${params.slug}`);
  const events: Event[] = await response.json();
  const event = events[0];

  return (
    <div className={styles.event}>
      <EventActions styles={styles} event={event} />
      
      <span>
        {event.date} at {event.time}
      </span>
      <h1>{event.name}</h1>
      {event.image && (
        <div className={styles.image}>
          <Image src={event.image} alt="event-image" width={960} height={600} />
        </div>
      )}

      <h3>Performers:</h3>
      <p>{event.performers}</p>
      <h3>Description:</h3>
      <p>{event.description}</p>
      <h3>Venue: {event.venue}</h3>
      <p>{event.address}</p>

      <Link href="/events" className={styles.back}>{"<"} Go Back</Link>
    </div>
  );
};

export default EventPage;
