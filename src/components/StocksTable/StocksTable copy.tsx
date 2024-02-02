"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { data as rows } from "../../../db/demoStocks10";
// import { data as rows } from "../../../db/demoStocks3000";
import { useState } from "react";
// import { useAsyncList } from "@react-stately/data";

// const rows = [
//   {
//     key: "1",
//     name: "Tony Reichert",
//     role: "CEO",
//     status: "Active",
//   },
//   {
//     key: "2",
//     name: "Zoey Lang",
//     role: "Technical Lead",
//     status: "Paused",
//   },
//   {
//     key: "3",
//     name: "Jane Fisher",
//     role: "Senior Developer",
//     status: "Active",
//   },
//   {
//     key: "4",
//     name: "William Howard",
//     role: "Community Manager",
//     status: "Vacation",
//   },
// ];

const columns = [
  {
    key: "ticker",
    label: "TICKER",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "country",
    label: "COUNTRY",
  },
  {
    key: "analystTargetPrice",
    label: "TARGET PRICE",
  },
  {
    key: "eps",
    label: "EPS",
  },
  // {
  //   key: "eps",
  //   label: "EPSx15",
  // },
];

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

export function StocksTable() {
  const [selectedColor, setSelectedColor] = useState("default");
  // const [isLoading, setIsLoading] = useState(true);

  // let list = useAsyncList({
  //   async load({ signal }) {
  //     let res = await fetch("https://swapi.py4e.com/api/people/?search", {
  //       signal,
  //     });
  //     let json = await res.json();
  //     setIsLoading(false);

  //     return {
  //       items: json.results,
  //     };
  //   },
  //   async sort({ items, sortDescriptor }) {
  //     return {
  //       items: items.sort((a, b) => {
  //         let first = a[sortDescriptor.column];
  //         let second = b[sortDescriptor.column];
  //         let cmp =
  //           (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

  //         if (sortDescriptor.direction === "descending") {
  //           cmp *= -1;
  //         }

  //         return cmp;
  //       }),
  //     };
  //   },
  // });

  return (
    <div className="flex flex-col gap-3">
      <Table
        isStriped
        color={selectedColor}
        selectionMode="multiple"
        defaultSelectedKeys={["2", "3"]}
        aria-label="Example table with dynamic content"
        // sortDescriptor={list.sortDescriptor}
        // onSortChange={list.sort}
        classNames={{
          table: "min-h-[400px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.ticker}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <RadioGroup
        label="Selection color"
        orientation="horizontal"
        value={selectedColor}
        onValueChange={setSelectedColor}
      >
        {colors.map((color) => (
          <Radio key={color} color={color} value={color} className="capitalize">
            {color}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
