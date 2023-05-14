import { Container } from "react-bootstrap";
import { getAllPostIds, getPostData } from "../../../lib/travelPosts";
import MainLayout from "../layouts/MainLayout";

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
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
  console.log({ htmlContent });
  return (
    <MainLayout>
      <Container>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
        <br />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </Container>
    </MainLayout>
  );
}
