import { getSortedPostsData as getTravelPostsData } from "../../lib/travelPosts";
import { getSortedPostsData as getBlogPostsData } from "../../lib/blogPosts";
import Home from "./components/Home";

export async function getStaticProps() {
  const allPostsData = getTravelPostsData().concat(getBlogPostsData());
  return {
    props: {
      allPostsData,
    },
  };
}

export default function HomePage({ allPostsData }) {
  return (
    <div>
      <Home allPostsData={allPostsData} />
    </div>
  );
}
