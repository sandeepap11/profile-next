import MainLayout from "./layouts/MainLayout";
import { getSortedPostsData } from "../../lib/travelPosts";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { formatDate } from "../utils/Methods";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const defaultThumbnail = "serverUrlPlaceHolder/images/blog/default.jpg";

const travel = ({ allPostsData }) => {
  return (
    <MainLayout>
      <Container>
        <h1 className="pt-4 pb-4 text-9xl">Travel</h1>
        <p>Check out the travel blogs</p>
        <Row>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <Col md={6} key={id}>
              <div className="pr-4 pb-4 h-full">
                <Link href={`/travel/${id}`} className="hover:text-white">
                  <div className="flex flex-col justify-between h-full">
                    <img
                      className="h-100 object-cover"
                      src={(thumbnail || defaultThumbnail).replace(
                        "serverUrlPlaceHolder",
                        process.env.SERVER_URL
                      )}
                      alt={title + " thumbnail"}
                    />

                    <div className="pt-2">
                      {title}
                      <br />
                      {formatDate(date)}
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </MainLayout>
  );
};

export default travel;
