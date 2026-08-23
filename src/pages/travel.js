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
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
        <p className="pt-2 pb-4 text-2xl md:text-3xl text-[rgb(var(--text-muted))]">
          A lot of football, a fair amount of nature, a huge collection of
          pictures and very little words.
        </p>
        <Row>
          {filteredPosts.map(({ id, title, date, thumbnail, tags }) => (
            <Col md={6} key={id}>
              <div className="pr-4 pb-16 h-full">
                <div className="group relative overflow-hidden rounded-2xl bg-[#131A26]/80 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <Link href={`/travel/${id}`} className="block">
                    <img
                      className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={(thumbnail || defaultThumbnail).replace(
                        "serverUrlPlaceHolder",
                        process.env.SERVER_URL,
                      )}
                      alt={title + " thumbnail"}
                    />
                  </Link>

                  <div className="p-5 space-y-3 h-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        {formatDate(date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-emerald-400 transition-colors">
                      <Link href={`/travel/${id}`} className="block">
                        {title}
                      </Link>
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags?.map((tag) => (
                        <Link
                          key={tag}
                          href={`/travel?tag=${tag}`}
                          className="px-2 py-0.5 text-xs font-mono rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:bg-slate-700/90"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
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
