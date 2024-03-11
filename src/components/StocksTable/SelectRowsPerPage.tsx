"use client";

import { Select, SelectItem } from "@nextui-org/select";

interface SelectRowsPerPageProps {
  rowsPerPage: number;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const options = "5,10,25,50,100".split(",");

export function SelectRowsPerPage({
  rowsPerPage,
  onRowsPerPageChange,
}: SelectRowsPerPageProps) {
  return (
    <Select
      aria-label="Select how many stocks i.e. rows should be shown"
      size="sm"
      label="Rows per page:"
      className="w-20 sm:w-32"
      selectionMode="single"
      defaultSelectedKeys={[String(rowsPerPage)]}
      disallowEmptySelection
      onChange={onRowsPerPageChange}
      classNames={{
        label: "hidden sm:block",
      }}
    >
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </Select>
  );
}
