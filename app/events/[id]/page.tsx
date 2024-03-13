import EventActions from "@/app/components/EventActions";
import EventImage from "@/app/components/EventImage";
import { Event } from "@/app/components/EventItem";
import styles from "@/app/styles/Event.module.css";
import { API_URL } from "@/config";
import Link from "next/link";
import { cookies } from "next/headers";

interface Props {
  params: { id: string };
}

const EventPage = async ({ params }: Props) => {
  // Remove token later and import
  const token = cookies().get("token") ? cookies().get("token")?.value : "" 

  const response = await fetch(`${API_URL}/api/events/${params.id}?populate=*&sort=date:asc`, {
    next: { revalidate: 1 },
  });
  const apiResponse = await response.json();
  const event: Event = apiResponse.data;

  const imageURL = event.attributes.image.data?.attributes?.formats.medium.url || "/images/event-default.png"

  return (
    <div className={styles.event}>
      <EventActions styles={styles} event={event} token={token} />
      
      <span>
        {new Date(event.attributes.date).toLocaleDateString("en-gb")} at {event.attributes.time}
      </span>
      <h1>{event.attributes.name}</h1>
      {event.attributes.image && (
        <div className={styles.image}>
          <EventImage imageURL={imageURL} width={960} height={600} />
        </div>
      )}

      <h3>Performers:</h3>
      <p>{event.attributes.performers}</p>
      <h3>Description:</h3>
      <p>{event.attributes.description}</p>
      <h3>Venue: {event.attributes.venue}</h3>
      <p>{event.attributes.address}</p>

      <Link href="/events" className={styles.back}>{"<"} Go Back</Link>
    </div>
  );
};

export default EventPage;
