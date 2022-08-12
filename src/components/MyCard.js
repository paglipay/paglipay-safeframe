import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export default function MyCard({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems);
    console.log("MyCard getItems: ");
  }, [getItems]);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <ul>
          {items.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
