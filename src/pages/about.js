import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import MainLayout from "./layouts/MainLayout";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  return (
    <MainLayout>
      <Container className="mt-16">
        <Head>
          <title>About | Sandeep</title>
        </Head>
        <Row className="items-center justify-center">
          <Col lg={5} className="flex flex-col items-center m-0 p-4">
            <img
              className="w-80 h-80 mb-8 lg:w-96 lg:h-96 rounded-full object-cover"
              src={process.env.SERVER_URL + "/images/about/profile-image.jpg"}
              alt={"profile image"}
            />

            <div className="grid place-items-center mb-8">
              <a
                className="text-6xl text-[#BBDFC5] hover:text-[#000]"
                href="https://github.com/sandeepap11"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </Col>
          <Col lg={7}>
            <h1 className="font-thin text-3xl lg:text-9xl text-[#7fff00]">
              Hello, I am Sandeep!
            </h1>
            <p className="font-bold text-xl lg:text-3xl pt-4">
              Software Developer | Agentic AI & Modern Web
            </p>
            <p className="font-thin text-base lg:text-2xl pt-4">
              I build intuitive web interfaces with React and design autonomous
              AI agents powered by local LLMs, tool-calling loops, and custom
              execution pipelines.{" "}
            </p>
            <p className="font-thin text-base lg:text-2xl pt-4">
              Based in Bengaluru, India. When I&apos;m not debugging multi-turn
              agent loops or building developer tooling, I&apos;m usually
              tracking football fixtures across the globe. I build software,
              travel for matchdays, and document the trade-offs along the way.
            </p>
            <p className="text-xs lg:text-xl text-[#FF579F] pt-4">
              This site is built using Next JS and deployed using Netlify.
            </p>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default About;
