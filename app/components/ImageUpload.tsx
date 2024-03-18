import React, { useState } from "react";
import { API_URL } from "@/config";
import styles from "@/app/styles/Form.module.css";

interface Props {
  eventId: string;
  imageUploaded: () => void;
  token: string | undefined
}

const ImageUpload = ({ eventId, imageUploaded, token }: Props) => {

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image!);
    formData.append("ref", "api::event.event");
    formData.append("refId", eventId);
    formData.append("field", "image");
    
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
};

export default ImageUpload;
