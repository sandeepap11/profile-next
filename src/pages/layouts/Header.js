import { HEADERS } from "@/utils/Constants";
import Link from "next/link";
import { useRouter } from "next/router";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function BasicExample() {
  const router = useRouter();

  return (
    <Navbar
      expand="lg"
      className="sticky top-0 z-50 bg-[#0B0F17]/80 backdrop-blur-md border-b border-slate-800/60"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight hover:text-green-400"
        >
          SANDEEP
        </Link>

        <div className="flex items-center">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex items-center gap-4">
              {HEADERS.sort((headerA, headerB) => headerA.id - headerB.id).map(
                (header) => {
                  const isActive =
                    (header.link === "/" && router.pathname === header.link) ||
                    (header.link !== "/" &&
                      router.pathname.includes(header.link));
                  return (
                    <Link
                      key={header.id}
                      href={header.link}
                      className={`text-sm font-medium px-3 py-1.5 transition-colors duration-150 ${
                        isActive
                          ? "bg-slate-600 text-green-400 rounded-lg hover:text-green-300"
                          : "text-slate-300 hover:text-slate-100"
                      }`}
                    >
                      {header.name}
                    </Link>
                  );
                },
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
}

export default BasicExample;
