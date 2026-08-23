import Head from "next/head";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import { getSortedPostsData } from "../../../lib/archivePosts";
import { Container, Row, Col } from "react-bootstrap";
import { formatDate } from "../../utils/Methods";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
}

export default function ArchiveIndex({ allPostsData }) {
  return (
    <MainLayout>
      <Head>
        <title>Archive | Sandeep</title>
      </Head>
      <Container className="pt-8 pb-16">
        <h1 className="text-4xl mb-6">Archive</h1>
        <Row>
          {allPostsData.map(({ id, title, date }) => (
            <Col md={12} key={id} className="mb-4">
              <Link href={`/archive/${id}`} className="text-xl hover:underline">
                {title}
              </Link>
              <div className="text-sm text-gray-400">{formatDate(date)}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </MainLayout>
  );
}
