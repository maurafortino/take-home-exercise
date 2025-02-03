import React from "react";
import { Container } from "react-bootstrap";

export const ErrorPage = ({ message }) => {
  return (
    <Container>
      <h6>An error occurred while making your request</h6>
      <p>{message}</p>
      <p>Please try again.</p>
    </Container>
  );
};

export default ErrorPage;
