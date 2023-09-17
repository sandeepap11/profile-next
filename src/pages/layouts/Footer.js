import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="text-center p-4">
      <Row>
        <p className="text-xl font-thin">
          © Sandeep {new Date().getFullYear()}. All rights reserved.
        </p>
      </Row>
    </Container>
  );
};

export default Footer;
