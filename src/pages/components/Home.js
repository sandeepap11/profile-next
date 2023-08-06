import { Col, Container, Row } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";
import { ITEM_TYPES, HOME_CONFIG } from "../../utils/HomeConfig";

const Home = () => {
  return (
    <MainLayout>
      {HOME_CONFIG.sort(
        (configA, configB) => configA.order - configB.order
      ).map((config) => (
        <div key={config.id}>
          {config.type === ITEM_TYPES.OPENER ? (
            <div className="relative">
              <div className="absolute w-100 h-100 z-1 flex flex-col justify-center align-items-start bg-[rgba(29,17,96,0.5)]">
                <h1 className="text-9xl text-[rgba(255,255,0,0.5)] pl-8 pb-8 font-bold	max-w-[60%]">
                  {config.text.h}
                </h1>
                <p className="text-8xl pl-8 pt-8 font-thin">{config.text.p}</p>
              </div>
              <video width="100%" autoPlay muted loop>
                <source
                  src={`${process.env.SERVER_URL}${config.video}`}
                  type="video/mp4"
                />
              </video>
            </div>
          ) : config.type === ITEM_TYPES.FEATURED ? (
            <div></div>
          ) : null}
        </div>
      ))}

      <Container>
        <Row className="items-center justify-center"></Row>
      </Container>
    </MainLayout>
  );
};

export default Home;
