import MainLayout from "./layouts/MainLayout";
import { getSortedPostsData } from "../../lib/blogPosts";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const travel = ({ allPostsData }) => {
  return (
    <MainLayout>
      <Container>
        <Row>
          {allPostsData.map(({ id, date, title }) => (
            <Col key={id}>
              <Link href={`/blog/${id}`}>{title}</Link>
              <br />
              {id}
              <br />
              {date}
            </Col>
          ))}
        </Row>
      </Container>
    </MainLayout>
  );
};

export default travel;
