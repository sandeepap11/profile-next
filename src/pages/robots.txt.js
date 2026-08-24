const baseUrl = "https://sandeepmadavu.com";

export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`);
  res.end();

  return { props: {} };
}

export default function Robots() {
  return null;
}
