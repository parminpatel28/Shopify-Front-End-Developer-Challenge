import React from "react";
import { Alert } from "react-bootstrap";
import "../App.css";

export default function Notification(props) {
  return (
    <Alert
      className="banner-top"
      variant="success"
      onClose={() => props.closeNotification()}
      dismissible
    >
      <Alert.Heading>Notification</Alert.Heading>
      <p>Thank you for your nominations!</p>
      <p> They will be saved!</p>
    </Alert>
  );
}
