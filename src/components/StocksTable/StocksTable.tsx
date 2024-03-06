"use client";

console.log("render StocksTable");

import type { IStock } from "@/../types/types";
import { useMemo, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Avatar,
  User,
} from "@nextui-org/react";
import {
  VerticalDots as VerticalDotsIcon,
  ChevronDown as ChevronDownIcon,
  Search as SearchIcon,
} from "@/components/Icons";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

// const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];
// const INITIAL_VISIBLE_COLUMNS = ["logoURL", "name", "ticker", "eps", "actions"];

// type Stock = (typeof stocks)[0];
interface StocksTable {
  stocks: IStock[];
}

type StatusColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export function StocksTable({ stocks }: StocksTable) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    // new Set(INITIAL_VISIBLE_COLUMNS),
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    // column: "name",
    // direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredStocks = [...stocks];

    if (hasSearchFilter) {
      filteredStocks = filteredStocks.filter(
        (stock) =>
          stock.ticker.toLowerCase().includes(filterValue.toLowerCase()) || /// icke
          stock.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    //:: STATUSFILTER
    // if (
    //   statusFilter !== "all" &&
    //   Array.from(statusFilter).length !== statusOptions.length
    // ) {
    //   filteredStocks = filteredStocks.filter((stock) =>
    //     Array.from(statusFilter).includes(stock.status),
    //   );
    // }

    return filteredStocks;
  }, [stocks, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const sortedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return [...filteredItems]
      .sort((a: IStock, b: IStock) => {
        const first = a[sortDescriptor.column as keyof IStock] as number;
        const second = b[sortDescriptor.column as keyof IStock] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      })
      .slice(start, end);
  }, [sortDescriptor, page, filteredItems, rowsPerPage]);

  //:: CUSTOMIZE CELLS WITH RECHERcELL-FUNCTION:
  const renderCell = useCallback((stock: IStock, columnKey: React.Key) => {
    //? Workaround for test-data exported from MongoDB
    //? MongoDB JSON-exports adds objects to some data types...
    // const cellValue = stock[columnKey as keyof Stock];
    const cellValue = stock[columnKey as keyof IStock] as string | number; //:: icke

    switch (columnKey) {
      case "name":
        return (
          <>
            <User
              name={stock.ticker}
              description={cellValue}
              avatarProps={{
                radius: "full",
                src: stock.logoURL,
              }}
            />
          </>
          // <Avatar
          //   isBordered
          //   color="success"
          //   // src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          //   src="https://api.twelvedata.com/logo/apple.com"
          // />
        );
      case "eps":
        return (
          <>
            <Chip color="default" size="sm" variant="flat">
              {cellValue}
            </Chip>
          </>
        );
      case "dividendYield":
        const divYield = Number(cellValue) * 100;
        let color: StatusColor = "default";

        if (divYield > 3) color = "warning";
        if (divYield > 4) color = "success";

        return (
          <>
            <Chip
              className={`${divYield > 3 && `animate-pulse`}`}
              color={color}
              size="sm"
              variant="flat"
            >
              {divYield.toFixed(1)} %
            </Chip>
          </>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                {/* <DropdownItem>Edit</DropdownItem> */}
                {/* <DropdownItem>Delete</DropdownItem> */}
                <DropdownItem>Favorite</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* //:: STATUS FILTER DROPDOWN */}
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            {/* //:: ^^^^^  */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {stocks.length} stocks
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    stocks.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No stocks found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.ticker}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
