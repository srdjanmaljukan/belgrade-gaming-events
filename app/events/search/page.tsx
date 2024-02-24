import { API_URL } from "@/config";
import { EventItem } from "../../components";
import { Event } from "../../components/EventItem";
import qs from "qs";
import Link from "next/link";

interface Props {
    searchParams: {term: string}
}

const SearchPage = async ({searchParams: {term}}: Props) => {

  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $containsi: term,
            },
          },
          {
            performers: {
              $containsi: term,
            },
          },
          {
            description: {
              $containsi: term,
            },
          },
          {
            venue: {
              $containsi: term,
            },
          },
        ],
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(
    `${API_URL}/api/events?populate=*&sort=date:asc&${query}`,
    {
      next: { revalidate: 1 },
    }
  );
  const apiResponse = await response.json();
  const events: Event[] = apiResponse.data;

  return (
    <div>
        <Link href="/events">Go Back</Link>
      <h1>Search Results for {term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default SearchPage;
