export const ITEM_TYPES = {
  OPENER: "OPENER",
  FEATURED: "FEATURED",
};

export const HOME_CONFIG = [
  {
    id: 1,
    order: 1,
    type: ITEM_TYPES.OPENER,
    text: {
      role: "Software Developer & AI Builder",
      heading: "Hi, I am Sandeep.",
      message:
        "Software engineer building AI agents, MCP integrations and intelligent developer tools. 15+ years building enterprise software, currently exploring what happens when LLMs get real tools and real work to do.",
    },
  },
  {
    id: 2,
    order: 2,
    type: ITEM_TYPES.FEATURED,
    length: 3,
    header: "Featured Blogs",
    items: [
      {
        id: "fpl-bot",
        order: 1,
        size: "L",
        category: "TECH",
      },
      {
        id: "instagram-bot",
        order: 2,
        size: "S",
        category: "TECH",
      },
      {
        id: "pr-review",
        order: 3,
        size: "S",
        category: "TECH",
      },
    ],
  },
];
