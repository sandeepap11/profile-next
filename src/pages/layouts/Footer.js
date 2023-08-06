import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="sticky z-1 bottom-0 top-full text-center p-4">
      <Row>
        <p className="text-3xl font-thin">
          © Sandeep {new Date().getFullYear()}. All rights reserved.
        </p>
      </Row>
    </Container>
  );
};

export default Footer;
