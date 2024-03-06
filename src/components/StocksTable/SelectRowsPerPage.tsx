import React from "react";
import { Select, SelectItem } from "@nextui-org/select";

interface SelectRowsPerPageProps {
  rowsPerPage: number;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const items = "5,10,25,50,100".split(",");

export function SelectRowsPerPage({
  rowsPerPage,
  onRowsPerPageChange,
}: SelectRowsPerPageProps) {
  return (
    // <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
    <Select
      aria-label="Select how many stocks i.e. rows should be shown"
      size="sm"
      label="Rows per page:"
      className="max-w-xs"
      defaultSelectedKeys={[String(rowsPerPage)]}
      selectionMode="single"
      onChange={onRowsPerPageChange}
      //   onChange={(event) => {
      //     onRowsPerPageChange(event);
      //   }}
      labelPlacement="outside-left"
    >
      {items.map((item) => (
        <SelectItem
          key={item}
          value={item}
          // className="text-right"
        >
          {item}
        </SelectItem>
      ))}
    </Select>
    // </div>
  );
}
