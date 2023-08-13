import MainLayout from "./layouts/MainLayout";
import { getSortedPostsData } from "../../lib/travelPosts";
import Link from "next/link";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  const tag = searchParams.get("tag");

  const filteredPosts = tag
    ? allPostsData.filter((post) => post.tags.includes(tag))
    : allPostsData;

  return (
    <MainLayout>
      <Container>
        <Head>
          <title>Travel | Sandeep</title>
        </Head>
        <h1 className="pt-4 pb-4 text-6xl md:text-9xl">Travel</h1>
        <p className="pt-2 pb-4 text-2xl md:text-3xl text-orange-300">
          Check out the travel blogs
        </p>
        <Row>
          {filteredPosts.map(({ id, title, date, thumbnail, tags }) => (
            <Col md={6} key={id}>
              <div className="pr-4 pb-16 h-full">
                <div className="flex flex-col justify-between h-full">
                  <div className="h-100 relative">
                    <Link
                      href={`/travel/${id}`}
                      className="hover:text-white h-100"
                    >
                      <div className="absolute h-100 w-100 z-1 bg-[rgba(0,0,0,0.2)] hover:bg-transparent" />
                      <img
                        className="h-100 object-cover"
                        src={(thumbnail || defaultThumbnail).replace(
                          "serverUrlPlaceHolder",
                          process.env.SERVER_URL
                        )}
                        alt={title + " thumbnail"}
                      />
                    </Link>
                  </div>
                  <div className="bg-[#2d0080] p-4">
                    <div className="pb-2 md:flex-col lg:flex justify-between items-center">
                      <p className="text-sm lg:text-xl w-fit text-white bg-black p-1">
                        {formatDate(date)}
                      </p>
                      <div className="tags break-words">
                        {tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/travel?tag=${tag}`}
                            className="text-white hover:underline pr-2 text-xs lg:text-xl"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-3xl md:h-24 lg:h-16">
                      <Link
                        href={`/travel/${id}`}
                        className="text-red-300 font-bold hover:text-yellow-500 h-100"
                      >
                        {title}{" "}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </MainLayout>
  );
};

export default travel;
