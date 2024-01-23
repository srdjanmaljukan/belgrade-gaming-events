import Showcase from "./Showcase"
import { API_URL } from "@/config";

export default async function Home() {

  const response = await fetch(`${API_URL}/api/events`, {next: {revalidate: 1}});
  const data = await response.json()
  console.log(data);

  return (
    <main>
      <Showcase />
      <h1>Upcoming Events</h1>
    </main>
  );
}
