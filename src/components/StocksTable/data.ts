import { ColumnSize } from "@react-types/table";

const columns = [
  //:: uid = columnKey
  //:: order here determines order in table
  {
    name: "LOGO",
    uid: "logoURL",
    // align: "center" as AlignType, //? not working; nextui bug?
    width: "60px" as ColumnSize,
  },
  {
    name: "TICKER",
    uid: "ticker",
    width: "100px" as ColumnSize,
    sortable: true,
  },
  {
    name: "NAME",
    uid: "name",
    sortable: true,
    width: "300px" as ColumnSize,
  },
  {
    name: "LIKED",
    uid: "liked",
    sortable: true,
    width: "50px" as ColumnSize,
  },
  {
    name: "ACTIONS",
    uid: "actions",
    hideHeader: true,
    sortable: false,
    width: "50px" as ColumnSize,
  },
  // { name: "PRICE", uid: "quotes", sortable: true, width: "100px" as ColumnSize, },
  {
    name: "TARGET PRICE",
    uid: "analystTargetPrice",
    sortable: true,
    width: "100px" as ColumnSize,
  },
  { name: "DIV %", uid: "dividendYield", sortable: true },
  // { name: "BOOK VALUE", uid: "bookValue", sortable: true },
  { name: "P/B", uid: "priceToBookRatio", sortable: true },
  { name: "EPS", uid: "eps", sortable: true },
  { name: "EPS15x", uid: "eps15x", sortable: true },
  {
    name: "52 WEEK HIGH",
    uid: "fiftyTwoWeekHigh",
    sortable: true,
    width: "100px" as ColumnSize,
  },

  {
    name: "52 WEEK LOW",
    uid: "fiftyTwoWeekLow",
    sortable: true,
    width: "100px" as ColumnSize,
  },

  {
    name: "MARKET CAP",
    uid: "marketCapitalization",
    sortable: true,
    width: "100px" as ColumnSize,
  },
  {
    name: "COUNTRY",
    uid: "country",
    sortable: true,
    width: "100px" as ColumnSize,
  },
  { name: "SECTOR", uid: "sector", sortable: true },
  { name: "INDUSTRY", uid: "industry", sortable: true },
  {
    name: "LAST UPDATED",
    uid: "updatedAt",
    sortable: true,
    width: "100px" as ColumnSize,
  },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions };
