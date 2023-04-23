import { HEADERS } from "@/utils/Constants";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";

function BasicExample() {
  const router = useRouter();

  return (
    <Navbar bg="#1d1160" expand="lg">
      <Container>
        <Link className="navbar-brand" href="/">
          SANDEEP
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="text-white" id="basic-navbar-nav">
          <Nav className="me-auto items-center justify-around w-80">
            {HEADERS.sort((headerA, headerB) => headerA.id - headerB.id).map(
              (header) => (
                <Link
                  key={header.id}
                  className={`hover:text-yellow-600 hover:decoration-1 hover:underline ${
                    (header.link === "/" && router.pathname === header.link) ||
                    (header.link !== "/" &&
                      router.pathname.includes(header.link))
                      ? "text-yellow-600 underline"
                      : "text-[color:white]"
                  }`}
                  href={header.link}
                >
                  {header.name}
                </Link>
              )
            )}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
