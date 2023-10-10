import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const Alert = ({ timeout, show, setShow }) => {
  useEffect(() => {
    if (show.visible) {
      const timer = setTimeout(() => {
        setShow({ visible: false, message: "" });
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [timeout, show, setShow]);

  return (
    <div
      className={`alert`}
      style={{ display: show.visible ? "block" : "none" }}
    >
      <span>{show.message}</span>
      <FontAwesomeIcon
        style={{ marginLeft: "5px" }}
        icon={faCheckCircle}
        className="icon"
      />
    </div>
  );
};

export { Alert };
