import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="text-center mt-4 p-3 bg-black w-screen">
      <Container>
        <Row>
          <p className="text-xl font-thin">
            © Sandeep {new Date().getFullYear()}. All rights reserved.
          </p>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
