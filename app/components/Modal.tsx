import React, { ReactNode } from "react";
import styles from "@/app/styles/Modal.module.css";
import { FaTimes } from "react-icons/fa";

interface Props {
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal = ({ onClose, children, title }: Props) => {
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <button type="button" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
          {title && <div>{title}</div>}
          <div className={styles.children}>{children}</div>
        </div>
      </div>

  );
};

export default Modal;
