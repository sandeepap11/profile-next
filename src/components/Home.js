import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import MainLayout from "../pages/layouts/MainLayout";
import { ITEM_TYPES, HOME_CONFIG } from "../utils/HomeConfig";
import { formatDate } from "../utils/Methods";

const defaultThumbnail = "serverUrlPlaceHolder/images/blog/default.jpg";

const Home = ({ allPostsData }) => {
  let featuredPosts = [];
  const featuredPostConfig = HOME_CONFIG.find(
    (config) => config.type === ITEM_TYPES.FEATURED
  ).items.sort((itemA, itemB) => itemA.order - itemB.order);

  for (let postConfigItem of featuredPostConfig) {
    const postItem = allPostsData.find((post) => post.id === postConfigItem.id);
    featuredPosts.push({
      ...postItem,
      size: postConfigItem.size,
      category: postConfigItem.category,
    });
  }

  return (
    <MainLayout>
      {HOME_CONFIG.sort(
        (configA, configB) => configA.order - configB.order
      ).map((config) => (
        <div key={config.id}>
          {config.type === ITEM_TYPES.OPENER ? (
            <div className="relative hidden md:block md:mt-8">
              <div className="absolute w-100 h-100 z-1 flex flex-col justify-center align-items-start bg-[rgba(29,17,96,0.5)]">
                <h1 className="md:text-8xl lg:text-9xl text-[rgba(255,255,0,0.5)] pl-8 pb-8 font-bold	max-w-[60%]">
                  {config.text.h}
                </h1>
                <p className="md:text-6xl lg:text-8xl pl-8 pt-8 font-thin">
                  {config.text.p}
                </p>
              </div>
              <video width="100%" autoPlay muted loop>
                <source
                  src={`${process.env.SERVER_URL}${config.video}`}
                  type="video/mp4"
                />
              </video>
            </div>
          ) : config.type === ITEM_TYPES.FEATURED ? (
            <Container className="pt-0 md:pt-16 pb-8">
              <h2 className="text-6xl pt-4 pb-8 font-thin">{config.header}</h2>
              <Row>
                {featuredPosts.map(
                  ({ id, title, date, thumbnail, tags, size, category }) => (
                    <Col sm={12} md={12} xl={size === "L" ? 12 : 6} key={id}>
                      <div className="pr-4 pb-16 h-full">
                        <div className="flex flex-col justify-between h-full">
                          <div className="h-100 relative">
                            <Link
                              href={`/${category.toLowerCase()}/${id}`}
                              className="hover:text-white h-100"
                            >
                              <div className="absolute h-100 w-100 z-1 bg-[rgba(0,0,0,0.2)] hover:bg-transparent" />
                              <img
                                className="h-100 w-100 object-cover"
                                src={(thumbnail || defaultThumbnail).replace(
                                  "serverUrlPlaceHolder",
                                  process.env.SERVER_URL
                                )}
                                alt={title + " thumbnail"}
                              />
                            </Link>
                          </div>
                          <div className="bg-[#2d0080] p-4">
                            <div className="pb-2 flex flex-col lg:flex-row justify-between items-start lg:items-center">
                              <p className="text-sm lg:text-xl w-fit text-white bg-black p-1">
                                {formatDate(date)}
                              </p>
                              <div className="tags break-words">
                                {tags.map((tag) => (
                                  <Link
                                    key={tag}
                                    href={`/${category.toLowerCase()}?tag=${tag}`}
                                    className="text-white hover:underline pr-2 text-xs lg:text-xl"
                                  >
                                    #{tag}
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <h3 className="text-3xl md:h-24 lg:h-16">
                              <Link
                                href={`/${category.toLowerCase()}/${id}`}
                                className="text-red-300 font-bold hover:text-yellow-500 h-100"
                              >
                                {title}{" "}
                              </Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )
                )}
              </Row>
            </Container>
          ) : null}
        </div>
      ))}
    </MainLayout>
  );
};

export default Home;
