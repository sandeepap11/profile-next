import { Container } from "react-bootstrap";
import { getAllPostIds, getPostData } from "../../../lib/blogPosts";
import MainLayout from "../layouts/MainLayout";
import { BlogPost } from "../travel/styled";
import { formatDate } from "../../utils/Methods";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
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

export default function Post({ postData }) {
  const htmlContent = postData.contentHtml.replaceAll(
    "serverUrlPlaceHolder",
    process.env.SERVER_URL
  );

  return (
    <MainLayout>
      <Container>
        <BlogPost>
          <h1 className="title">{postData.title}</h1>
          <div className="tags">
            TAGS:{" "}
            {postData.tags.map((tag) => (
              <div className="tag" key={tag}>
                #{tag}
              </div>
            ))}
          </div>
          <p className="date">{formatDate(postData.date)}</p>
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </BlogPost>
      </Container>
    </MainLayout>
  );
}
