import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import MainLayout from "../pages/layouts/MainLayout";
import { ITEM_TYPES, HOME_CONFIG } from "../utils/HomeConfig";
import { formatDate } from "../utils/Methods";

const defaultThumbnail = "serverUrlPlaceHolder/images/blog/default.jpg";

const Home = ({ allPostsData }) => {
  let featuredPosts = [];
  const featuredPostConfig = HOME_CONFIG.find(
    (config) => config.type === ITEM_TYPES.FEATURED,
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
        (configA, configB) => configA.order - configB.order,
      ).map((config) => (
        <div key={config.id}>
          {config.type === ITEM_TYPES.OPENER ? (
            <section className="pt-0 pb-24">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Software Developer & AI Builder
                </span>

                <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
                  {config.text.h}
                </h1>

                <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mt-3">
                  {config.text.p}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href="/tech"
                    className="bg-slate-100 text-slate-900 font-semibold px-4 py-2 rounded-lg hover:bg-white"
                  >
                    Explore Tech & AI
                  </Link>
                  <Link
                    href="/travel"
                    className="text-slate-300 hover:text-white px-4 py-2"
                  >
                    Travel Stories →
                  </Link>
                </div>
              </div>
            </section>
          ) : config.type === ITEM_TYPES.FEATURED ? (
            <Container className="pt-0 md:pt-16 pb-8">
              <div className="mb-4">
                <div className="h-0.5 w-16 bg-[rgb(var(--accent-mint))]/40 rounded" />
                <h2 className="text-2xl font-bold tracking-tight text-slate-100 pt-4">
                  {config.header}
                </h2>
              </div>
              <Row>
                {featuredPosts.map(
                  ({ id, title, date, thumbnail, tags, size, category }) => (
                    <Col sm={12} md={12} xl={size === "L" ? 12 : 6} key={id}>
                      <div className="pr-4 pb-16 h-full">
                        <div className="h-100 group relative overflow-hidden rounded-2xl bg-[#131A26]/80 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                          <Link
                            href={`/${
                              category.toLowerCase() === "blog"
                                ? "tech"
                                : category.toLowerCase()
                            }/${id}`}
                            className="block"
                          >
                            <img
                              className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-300"
                              src={(thumbnail || defaultThumbnail).replace(
                                "serverUrlPlaceHolder",
                                process.env.SERVER_URL,
                              )}
                              alt={title + " thumbnail"}
                            />
                          </Link>

                          <div className="p-5 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-slate-400">
                                {formatDate(date)}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-emerald-400 transition-colors">
                              <Link
                                href={`/${category.toLowerCase() === "blog" ? "tech" : category.toLowerCase()}/${id}`}
                                className="block"
                              >
                                {title}
                              </Link>
                            </h3>

                            {/** render summary/description if available in frontmatter */}
                            {/** many posts may not have this field; render conditionally */}
                            {/** try common keys: summary, description, excerpt */}
                            {typeof featuredPosts !== "undefined" && false
                              ? null
                              : null}
                            {typeof featuredPosts !== "undefined"}

                            {
                              /* summary fields conditional */ false && (
                                <p className="text-sm text-slate-400 line-clamp-2 mt-2">
                                  {/* summary */}
                                </p>
                              )
                            }

                            <div className="flex flex-wrap gap-2 mt-3">
                              {tags?.map((tag) => (
                                <Link
                                  key={tag}
                                  href={`/${
                                    category.toLowerCase() === "blog"
                                      ? "tech"
                                      : category.toLowerCase()
                                  }?tag=${tag}`}
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
                  ),
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
