import { useState, useEffect, useCallback } from "react";
import { Button, Card } from "react-bootstrap";
export default function Safeframe({ getItems, id }) {
  const [recvMsg, setRecvMsg] = useState([]);
  const [items, setItems] = useState([]);
  const handleMessage = useCallback(
    (e) => {
      // console.log("Safeframe handleMessage getItems: ", id);
      // setRecvMsg([...recvMsg, JSON.stringify(e.data)]);
      if (e.data.id === id) {
        console.log("Safeframe handleMessage getItems e.data.id: ", id, e);
        setItems(getItems);
        setRecvMsg([...recvMsg, JSON.stringify(e.data)]);
      } else if (e.data?.action === "broadcast") {
        setItems(getItems);
        setRecvMsg([...recvMsg, JSON.stringify(e.data)]);
      }
    },
    [getItems, id]
  );

  useEffect(() => {
    console.log("Safeframe useEffect handleMessage: ", id);
    window.addEventListener("message", handleMessage, false);
    return () => {
      console.log("Safeframe useEffect handleMessage return: ", id);
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage, id]);

  return (
    <Card>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          <h1 onClick={() => handleMessage()}>Safeframe {id}</h1>
          <h3 onClick={() => window.postMessage({ action: "broadcast" }, "*")}>
            Broadcast!!!
          </h3>
          <ul>
            {recvMsg.map((e, i) => (
              <li key={`rc-${i}`}>{JSON.stringify(e)}</li>
            ))}
          </ul>
        </Card.Text>
        {items.map((e) => (
          <Button
            key={e}
            onClick={() => window.postMessage({ id: e }, "*")}
            variant="primary"
          >
            Send to Safeframe{e}
          </Button>
        ))}
      </Card.Body>
    </Card>
  );
}
