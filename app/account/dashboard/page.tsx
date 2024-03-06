import React from "react";
import { API_URL } from "@/config";
import { cookies } from "next/headers";

const DashboardPage = async () => {
  const token = cookies().get("token") ? cookies().get("token")?.value : "" 
  console.log(token);
  const res = await fetch(`${API_URL}/api/my-events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();
  console.log(events);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
