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
            <h1 className="font-thin text-3xl lg:text-9xl text-[#BAB700]">
              Hello, I am Sandeep!
            </h1>
            <p className="font-bold text-xl lg:text-3xl pt-4">
              I am a Front-End developer specializing in React JS. I build
              intuitive, responsive and accessible web user interfaces.
            </p>
            <p className="font-thin text-base lg:text-2xl pt-4">
              I live in Bengaluru, India. I love Football (soccer), to travel,
              and to travel to football games. I have tried to combine all of
              these on here.
            </p>
            <p className="text-xs lg:text-xl text-[#FF579F] pt-4">
              This site is built using Next JS and deployed using Vercel
            </p>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default About;
