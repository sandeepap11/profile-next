import { Col, Container, Row } from "react-bootstrap";
import MainLayout from "./layouts/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <Container>
        <Row className="items-center justify-center">
          <Col lg={8}>Text</Col>
          <Col lg={4}>Text</Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default About;
