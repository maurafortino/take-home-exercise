import React from "react";
import { Spinner, Container } from "react-bootstrap";

export const LoadingPage = () => {
  return (
    <Container>
      <Spinner animation="border" role="status"></Spinner>
      <span style={{ paddingLeft: "1em", fontSize: "25px" }}>
        Loading Products...
      </span>
    </Container>
  );
};

export default LoadingPage;
