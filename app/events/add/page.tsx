"use client";

import EventForm from '@/app/components/EventForm';
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEventPage = () => {

  return (
    <div>
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <EventForm event={undefined} />
    </div>
  );
};

export default AddEventPage;
