import { useState, useEffect, useCallback, useRef } from "react";
import { Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";
import SFrame from "./SFrame";
export default function Safeframe({ getItems, id }) {
  const [recvMsg, setRecvMsg] = useState([]);
  const [items, setItems] = useState([]);
  const sfRef = useRef(null);
  const handleMessage = useCallback(
    (e) => {
      // console.log("Safeframe handleMessage getItems: ", id);
      // setRecvMsg([...recvMsg, JSON.stringify(e.data)]);
      if (e.data.id === id) {
        console.log("Safeframe handleMessage getItems e.data.id: ", id, e);
        setItems(getItems);
        setRecvMsg([...recvMsg, JSON.stringify(e.data)]);
        sfRef.current?.contentWindow?.postMessage(e.data, "*");
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
    <Card style={{ marginTop: "15px" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <SFrame ref={sfRef} />
      <Card.Body>
        <Card.Title>Safeframe {id}</Card.Title>
        <Card.Text>
          <Button
            onClick={() => window.postMessage({ action: "broadcast" }, "*")}
            variant="primary"
          >
            Broadcast
          </Button>
        </Card.Text>
        <ul>
          {recvMsg.map((e, i) => (
            <li key={`rc-${i}`}>{JSON.stringify(e)}</li>
          ))}
        </ul>
        <Container fluid={true}>
          <Row>
            {items.map((e, i) => (
              <Col lg={4} key={`col-sf-${id}-i-${i}`}>
                <Button
                  key={`play-sf-${id}-i-${i}`}
                  style={{ marginTop: "5px" }}
                  onClick={() =>
                    window.postMessage(
                      { id: e, action: { type: "playVid" } },
                      "*"
                    )
                  }
                  variant="primary"
                >
                  Play SF-{e}
                </Button>
                <Button
                  key={`stop-i-${i}`}
                  style={{ marginTop: "5px" }}
                  onClick={() =>
                    window.postMessage(
                      { id: e, action: { type: "clearInterval" } },
                      "*"
                    )
                  }
                  variant="primary"
                >
                  Stop SF-{e}
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}
