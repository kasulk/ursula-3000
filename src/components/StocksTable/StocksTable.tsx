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
  Link,
} from "@nextui-org/react";
import {
  VerticalDots as VerticalDotsIcon,
  ChevronDown as ChevronDownIcon,
  Search as SearchIcon,
} from "@/components/Icons";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";
import { SelectRowsPerPage } from "..";

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
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

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
    ///###  STATUSFILTER  ###
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

  ///###  CUSTOMIZE CELLS WITH RENDERCELL-FUNCTION  ###
  const renderCell = useCallback((stock: IStock, columnKey: React.Key) => {
    const cellValue = stock[columnKey as keyof IStock]; //-- as string | number; //:: icke
    let color: StatusColor = "default";

    switch (columnKey) {
      case "logoURL":
        return (
          <Avatar
            isBordered
            name={stock.ticker}
            color="default"
            src={cellValue}
            showFallback
          />
        );
      case "ticker":
        return <div>{cellValue}</div>;
      case "name":
        return <div className="text-sm">{cellValue}</div>;
      case "dividendYield":
        const divYield = Number(cellValue) * 100;

        if (divYield > 3) color = "warning";
        if (divYield > 4) color = "success";

        return (
          <Chip
            className={`${divYield > 3 && `animate-pulse`}`}
            color={color}
            size="sm"
            variant="flat"
          >
            {divYield.toFixed(1)} %
          </Chip>
        );
      case "eps":
        return (
          cellValue && (
            <Chip color="default" size="sm" variant="flat">
              {cellValue}
            </Chip>
          )
        );
      case "priceToBookRatio":
        const pb = Number(cellValue);

        if (pb <= 1) color = "success";
        if (pb > 1 && pb < 1.3) color = "warning";
        if (pb >= 5) color = "danger";

        return (
          cellValue && (
            <Chip
              className={`${pb <= 1 && `animate-pulse`}`}
              color={color}
              size="sm"
              variant="flat"
            >
              {pb.toFixed(2)}
            </Chip>
          )
        );
      case "industry":
        return (
          <div title={cellValue}>
            {cellValue.length > 16 ? cellValue.slice(0, 15) + "..." : cellValue}
          </div>
        );
      case "marketCapitalization":
        const marketCapInBillions = Number(cellValue) / 1000000000;
        return <div>{marketCapInBillions.toFixed(1) + " B"}</div>;
      case "actions":
        return (
          <Dropdown backdrop="opaque">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Open actions dropdown menu"
              disabledKeys={["favorite"]}
              variant="bordered"
            >
              <DropdownItem
                key="details"
                textValue="Show details on Finviz.com"
                // description="Show more on Finviz.com" // if set, one has to click the exact text for the link to work...
              >
                <Link
                  isExternal
                  showAnchorIcon
                  color="foreground"
                  href={`https://finviz.com/quote.ashx?t=${stock.ticker}`}
                  aria-label="Show details on Finviz.com"
                  className="w-full"
                >
                  Details for {stock.ticker} (finviz.com)
                </Link>
              </DropdownItem>
              <DropdownItem
                key="favorite"
                textValue="Mark this stock as favorite"
                description="Mark this stock as favorite"
              >
                Favorite
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      case "updatedAt":
        return <div>{new Date(cellValue).toLocaleDateString()}</div>;
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
      // (numRows: number) => {
      // setRowsPerPage(numRows);
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

  ///###  TABLE NAV  ###
  const topContent = useMemo(() => {
    return (
      <div className="fixed left-0 top-0 z-20 flex h-72 w-full items-center justify-center bg-background pb-6">
        <div className="flex h-full w-8/12 flex-col justify-end gap-4">
          <div className="flex items-center justify-between sm:gap-3">
            <Input
              size="sm"
              isClearable
              className="w-full sm:max-w-[65%] md:max-w-[44%]"
              placeholder="Filter by name or ticker..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              {/* ///###  STATUS FILTER DROPDOWN  ### */}
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
              {/* ///  ^^^^^  */}
              <Dropdown>
                <DropdownTrigger className="hidden w-32 sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Choose which table columns to display"
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
            <SelectRowsPerPage
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </div>
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
  ///###  END TABLE NAV  ###

  ///###  TABLE FOOTER  ###
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
  ///###  END TABLE FOOTER  ###

  return (
    <div className="w-11/12">
      <Table
        aria-label="Stocks table with data, pagination and sorting of 3000 stocks"
        // isHeaderSticky
        // removeWrapper
        // isStriped
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "mt-24 overflow-x-auto whitespace-nowrap",
          /// since layout-prop (= column-widths) is set to 'fixed',
          /// the table width and column widths have to be set manually
          table: "w-[3000px] setFirstColumnWidthManually", /// workaround, see global.css
          ///     ^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^
        }}
        color="primary"
        layout="fixed"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.align}
              allowsSorting={column.sortable}
              hideHeader={column.hideHeader}
              width={column.width}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No stocks found..."} items={sortedItems}>
          {(item) => (
            <TableRow key={item.ticker}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
