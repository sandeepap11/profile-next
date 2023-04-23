import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="sticky z-1 bottom-0 top-full text-center p-4">
      <Row>
        <div>© Sandeep {new Date().getFullYear()}. All rights reserved.</div>
      </Row>
    </Container>
  );
};

export default Footer;
