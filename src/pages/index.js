import Head from "next/head";
import Script from "next/script";
import { getSortedPostsData as getTravelPostsData } from "../../lib/travelPosts";
import { getSortedPostsData as getBlogPostsData } from "../../lib/blogPosts";
import Home from "../components/Home";

const GA_MEASUREMENT_ID = "G-YH9RV1HJJG";

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
      <Head>
        <title>Home | Sandeep</title>
      </Head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Home allPostsData={allPostsData} />
    </div>
  );
}
