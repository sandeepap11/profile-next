import { Container } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../../lib/travelPosts";
import MainLayout from "../layouts/MainLayout";
import { formatDate } from "../../utils/Methods";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  let relatedPosts = [];
  if (postData.related && Array.isArray(postData.related)) {
    relatedPosts = await Promise.all(
      postData.related.map(async (relId) => {
        try {
          const rel = await getPostData(relId);
          return {
            id: rel.id,
            title: rel.title,
            date: rel.date,
            thumbnail: rel.thumbnail || null,
          };
        } catch (e) {
          return null;
        }
      }),
    );
    relatedPosts = relatedPosts.filter(Boolean);
  }

  return {
    props: {
      postData,
      relatedPosts,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData, relatedPosts }) {
  const htmlContent = postData.contentHtml.replaceAll(
    "serverUrlPlaceHolder",
    process.env.SERVER_URL,
  );

  return (
    <MainLayout>
      <Container>
        <div className="blog-post">
          <Head>
            <title>Travel | {postData.title}</title>
          </Head>
          <h1 className="title">{postData.title}</h1>
          <div className="tags">
            TAGS:{" "}
            {postData.tags.map((tag) => (
              <div className="tag" key={tag}>
                <Link
                  href={`/travel?tag=${tag}`}
                  className="hover:text-white hover:underline"
                >
                  #{tag}
                </Link>
              </div>
            ))}
          </div>
          <p className="date">{formatDate(postData.date)}</p>
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold tracking-tight text-slate-100">
                Related
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/travel/${rp.id}`}
                    className="block p-4 bg-[rgb(19,22,30)] rounded-lg hover:shadow-md"
                  >
                    {rp.thumbnail && (
                      <img
                        src={rp.thumbnail.replace(
                          "serverUrlPlaceHolder",
                          process.env.SERVER_URL,
                        )}
                        alt={rp.title}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                    )}
                    <div className="text-sm font-medium text-slate-100">
                      {rp.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      {formatDate(rp.date)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </MainLayout>
  );
}
