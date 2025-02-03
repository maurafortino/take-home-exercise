import React from "react";
import "../App.css";
import ListGroup from "react-bootstrap/ListGroup";

function Filter({ filter, onChange }) {
  return (
    <ListGroup.Item key={filter.value}>
      <label>
        <input
          type="checkbox"
          value={filter.value}
          checked={filter.checked}
          onChange={onChange}
          id={filter.value}
        />
        {filter.name}
      </label>
    </ListGroup.Item>
  );
}

export default Filter;
