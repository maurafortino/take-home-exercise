import React from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export function Product({ product }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{product.product.name} </Card.Title>
        <Card.Subtitle>Score: {product.score}</Card.Subtitle>
        {product.product.characteristics.map((char, charIndex) => (
          <Badge key={charIndex} bg="secondary" className="characteristic-tag">
            {char}
          </Badge>
        ))}
      </Card.Body>
    </Card>
  );
}

export default Product;
