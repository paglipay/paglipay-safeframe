import { useState, useCallback } from "react";
import { Container, Col, Row } from "react-bootstrap";
import MyCard from "./components/MyCard";
import Safeframe from "./components/Safeframe";
export default function App() {
  console.log("hello?");
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // const getItems = useCallback(() => {
  //   return [number, number + 1, number + 2];
  // }, [number]);
  const getItems = () => {
    return [...Array(number).keys()];
  };

  return (
    <Container fluid={true}>
      <Row>
        <Col lg="3">
          <h1 onClick={() => setNumber(number + 1)}>{number}</h1>
          <h1 onClick={() => setDark(!dark)}>{JSON.stringify(dark)}</h1>
          <h1>{getItems()}</h1>
        </Col>
      </Row>
      <Row>
        {[...Array(number).keys()].map((e,i) => {
          return (
            <Col key={`Col-${i}`} lg="3">
              <Safeframe getItems={getItems} id={e} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
