import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="text-center mt-4 p-3 bg-[rgb(var(--bg-surface)/0.6)] backdrop-blur-md w-screen border-t border-[rgba(255,255,255,0.03)]">
      <Container>
        <Row>
          <p className="text-base font-thin text-[rgb(var(--text-muted))]">
            © Sandeep {new Date().getFullYear()}. All rights reserved.
          </p>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
