import EventForm from "@/app/components/EventForm";
import { Event } from "@/app/components/EventItem";
import { API_URL } from "@/config";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCookie from "@/helpers";

interface Props {
  params: { id: string };
}

const EditEventPage = async ({ params }: Props) => {

  const token = getCookie()

  const response = await fetch(
    `${API_URL}/api/events/${params.id}?populate=*&sort=date:asc`,
    {
      next: { revalidate: 1 },
    }
  );
  const apiResponse = await response.json();
  const event: Event = apiResponse.data;

  const imageURL =
    event.attributes.image.data?.attributes?.formats.medium.url ||
    "/images/event-default.png";


  return (
    <div>
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <EventForm event={event} token={token} />
    </div>
  );
};

export default EditEventPage;
