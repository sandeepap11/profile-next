export const ITEM_TYPES = {
  OPENER: "OPENER",
  FEATURED: "FEATURED",
};

export const HOME_CONFIG = [
  {
    id: 1,
    order: 1,
    type: ITEM_TYPES.OPENER,
    video: "/videos/home.mov",
    text: { h: "Hi, my name is Sandeep.", p: "Welcome to my personal blog!" },
  },
  {
    id: 2,
    order: 2,
    type: ITEM_TYPES.FEATURED,
    length: 3,
    header: "Featured Blogs",
    items: [
      {
        id: "switzerland",
        order: 1,
        size: "L",
        category: "TRAVEL",
      },
      {
        id: "dortmund",
        order: 2,
        size: "S",
        category: "TRAVEL",
      },
      {
        id: "italy",
        order: 3,
        size: "S",
        category: "TRAVEL",
      },
      {
        id: "barcelona",
        order: 4,
        size: "S",
        category: "TRAVEL",
      },
      {
        id: "milan",
        order: 5,
        size: "S",
        category: "TRAVEL",
      },
      {
        id: "custom-grid-search-sort",
        order: 6,
        size: "S",
        category: "BLOG",
      },
    ],
  },
];
