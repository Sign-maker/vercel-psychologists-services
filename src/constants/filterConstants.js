import {
  orderByChild,
  limitToFirst,
  limitToLast,
  startAt,
  endBefore,
  orderByKey,
} from "firebase/database";

export const SORT_ORDER = {
  asc: "asc",
  desc: "desc",
};

export const LIMIT = 3;

const PRICE_TO_FILTER = 170;

export const FILTER_OPTIONS = {
  nameAsc: {
    id: "nameAsc",
    key: "name",
    queryConstraint: [orderByChild("name"), limitToFirst(LIMIT + 1)],
    value: "A to Z",
    sortOrder: SORT_ORDER.asc,
  },
  nameDesc: {
    id: "nameDesc",
    key: "name",
    queryConstraint: [orderByChild("name"), limitToLast(LIMIT + 1)],
    value: "Z to A",
    sortOrder: SORT_ORDER.desc,
  },
  priceGreater: {
    id: "priceGreater",
    key: "price_per_hour",
    queryConstraint: [orderByChild("price_per_hour"), limitToFirst(LIMIT + 1)],
    additionalQueryConstraint: [startAt(PRICE_TO_FILTER)],
    value: `Greater than ${PRICE_TO_FILTER}$`,
    sortOrder: SORT_ORDER.asc,
  },
  priceLess: {
    id: "priceLess",
    key: "price_per_hour",
    queryConstraint: [
      orderByChild("price_per_hour"),
      limitToFirst(LIMIT + 1),
      endBefore(PRICE_TO_FILTER),
    ],
    value: `Less than ${PRICE_TO_FILTER}$`,
    sortOrder: SORT_ORDER.asc,
  },
  popularAsc: {
    id: "popularAsc",
    key: "rating",
    queryConstraint: [orderByChild("rating"), limitToFirst(LIMIT + 1)],
    value: "Not popular",
    sortOrder: SORT_ORDER.asc,
  },
  popularDesc: {
    id: "popularDesc",
    key: "rating",
    queryConstraint: [orderByChild("rating"), limitToLast(LIMIT + 1)],
    value: "Popular",
    sortOrder: SORT_ORDER.desc,
  },
  showAll: {
    id: "showAll",
    queryConstraint: [orderByKey(), limitToFirst(LIMIT + 1)],
    value: "Show all",
    sortOrder: SORT_ORDER.asc,
  },
};
