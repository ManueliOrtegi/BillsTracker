"use client";

import { ReactNode, useEffect } from "react";

interface AlertProps {
  type: "success" | "danger" | "warning" | "info";
  message: string;
  children?: ReactNode;
  onClose?: () => void;
}

const Alert = ({ type, message, children, onClose }: AlertProps) => {
  useEffect(() => {
    if (!onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="toast show position-fixed top-0 end-0 m-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: 1055 }}
    >
      <div className={`toast-header text-bg-${type}`}></div>
      <div className="d-flex toast-body justify-content-between fade show">
        {message}
        {children}
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Alert;
