import React from "react";
import Filter from "./Filter";
import { Button, Container, Form } from "react-bootstrap";

const FilterMenu = ({ isClicked, filters, onChange, onClick }) => {
  if (!isClicked) return null;

  return (
    <Form>
      <Container className="grid">
        {filters?.map((filter) => {
          return (
            <Filter filter={filter} key={filter.value} onChange={onChange} />
          );
        })}
      </Container>
      <div className="button">
        <Button variant="primary" size="sm" onClick={onClick}>
          Filter Products
        </Button>
      </div>
    </Form>
  );
};

export default FilterMenu;
