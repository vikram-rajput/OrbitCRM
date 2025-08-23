"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown, Columns, FilterIcon, MoreHorizontal, PlusCircle } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export type Order = {
  id: number;
  product_name: string;
  image: string;
  customer: Customer;
  price?: string;
  status: "active" | "transportation" | "pending" | "completed" | "cancel";
  date?: string;
  type?: string;
};

export type Customer = {
  name?: string;
  email?: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/pages/orders/${row.getValue("id")}`}
        className="text-muted-foreground hover:text-primary hover:underline">
        #{row.getValue("id")}
      </Link>
    )
  },
  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Image
          src={`https://bundui-images.netlify.app${row.original.image}`}
          width={60}
          height={60}
          className="h-10 w-10 rounded-md lg:h-16 lg:w-16"
          unoptimized
          alt="..."
        />
        {row.getValue("product_name")}
      </div>
    )
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-3"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="size-3" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("price")
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;

      return (
        <div className="space-y-1">
          <div className="font-semibold">{customer.name}</div>
          <div className="text-muted-foreground">{customer.email}</div>
        </div>
      );
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-3"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="size-3" />
        </Button>
      );
    },
    cell: ({ row }) => row.getValue("date")
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="-ml-3"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="size-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      const statusMap = {
        active: "success",
        transportation: "info",
        pending: "warning",
        cancel: "destructive",
        completed: "success",
        delivered: "success"
      } as const;

      const statusClass = statusMap[status] ?? "secondary";

      return (
        <div>
          <Badge variant={statusClass} className="capitalize">
            {status.replaceAll("-", " ")}
          </Badge>
        </div>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Order Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];

export default function OrdersDataTable({ data }: { data: Order[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  const statuses = [
    {
      value: "pending",
      label: "Pending"
    },
    {
      value: "completed",
      label: "Completed"
    },
    {
      value: "shipped",
      label: "Shipped"
    },
    {
      value: "delivered",
      label: "Delivered"
    }
  ];

  const categories = [
    {
      value: "beauty",
      label: "Beauty"
    },
    {
      value: "technology",
      label: "Technology"
    },
    {
      value: "toys",
      label: "Toys"
    },
    {
      value: "food",
      label: "Food"
    },
    {
      value: "home-appliances",
      label: "Home Appliances"
    }
  ];

  const Filters = () => {
    return (
      <>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <PlusCircle />
              Status
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-0">
            <Command>
              <CommandInput placeholder="Status" className="h-9" />
              <CommandList>
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem key={status.value} value={status.value}>
                      <div className="flex items-center space-x-3 py-1">
                        <Checkbox id={status.value} />
                        <label
                          htmlFor={status.value}
                          className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {status.label}
                        </label>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <PlusCircle />
              Category
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-0">
            <Command>
              <CommandInput placeholder="Category" className="h-9" />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem key={category.value} value={category.value}>
                      <div className="flex items-center space-x-3 py-1">
                        <Checkbox id={category.value} />
                        <label
                          htmlFor={category.value}
                          className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {category.label}
                        </label>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Input
          placeholder="Search orders..."
          value={(table.getColumn("product_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("product_name")?.setFilterValue(event.target.value)}
          className="md:max-w-sm"
        />
        <div className="hidden gap-2 md:flex">
          <Filters />
        </div>
        {/*filter for mobile*/}
        <div className="inline md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <FilterIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4">
              <div className="grid space-y-2">
                <Filters />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="ms-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span className="hidden lg:inline">Columns</span> <Columns />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
