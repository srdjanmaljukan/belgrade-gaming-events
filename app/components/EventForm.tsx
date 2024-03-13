"use client";

import { API_URL } from "@/config";
import styles from "@/app/styles/Form.module.css";
import { FaImage } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Event } from "./EventItem";
import moment from "moment";
import EventImage from "./EventImage";
import Modal from "./Modal";
import ImageUpload from "./ImageUpload";

interface Props {
  event: Event | undefined;
  token: string | undefined
}

const EventForm = ({ event, token }: Props) => {

  const [values, setValues] = useState({
    name: event?.attributes.name || "",
    performers: event?.attributes.performers || "",
    venue: event?.attributes.venue || "",
    address: event?.attributes.address || "",
    date: event?.attributes.date || "",
    time: event?.attributes.time || "",
    description: event?.attributes.description || "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    event?.attributes.image.data
      ? event.attributes.image.data.attributes.formats.thumbnail.url
      : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }

    const res = event
      ? await fetch(`${API_URL}/api/events/${event.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: values }),
        })
      : await fetch(`${API_URL}/api/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: values }),
        });

    if (!res.ok) {
      toast.error("Something Went Wrong!");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.data.id}`);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/api/events/${event?.id}?populate=*`)
    const apiResponse = await res.json();
    const evt: Event = apiResponse.data
    setImagePreview(evt.attributes.image.data?.attributes?.formats.thumbnail.url!)
    setShowModal(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={event ? moment(values.date).format("yyyy-MM-DD") : values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="descritpion">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input
          type="submit"
          value={event ? "Update Event" : "Add Event"}
          className="btn"
        />
      </form>

      <h2>Image Preview</h2>
      {imagePreview ? (
        <EventImage imageURL={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} title="Image Upload">
        {event && <ImageUpload eventId={event?.id} imageUploaded={imageUploaded} />}
      </Modal>}
    </div>
  );
};

export default EventForm;
