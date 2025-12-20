import { useState } from "react";

import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, MoreHorizontal, RefreshCw } from "lucide-react"; // Added RefreshCw for recovery

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

/* --------------------------------------------------------
// Types and Props Setup
-------------------------------------------------------- */

/* -------------------------------------------------------- TYPES -------------------------------------------------------- */
export type FilterType = "input" | "select";
export interface FilterConfig {
  key: string;
  label?: string;
  type: FilterType;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}
export interface DynamicTableProps<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  data: T[];
  columns: string[];
  filters?: FilterConfig[];
  pageSize: number;
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onFiltersChange: (filters: Record<string, string>) => void;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => Promise<void>;
  handleRecovery?: (row: T) => Promise<void>;
  onDeleteComplete?: () => void;
  customActions?: Array<{
    icon: React.ReactNode;
    label?: string;
    href?: string;
    onClick?: (row: T) => void;
    dialog?: (row: T) => React.ReactNode;
  }>;
}

export default function DynamicTable<
  T extends Record<string, unknown> = Record<string, unknown>
>({
  data,
  columns,
  filters = [],
  pageSize,
  total,
  currentPage,
  onPageChange,
  onFiltersChange,
  onView,
  onEdit,
  onDelete,
  onDeleteComplete,
  handleRecovery,
  customActions = [],
}: DynamicTableProps<T>) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  /* DELETE HANDLING */
  const confirmDelete = (row: T) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedRow && onDelete) {
      await onDelete(selectedRow);
      onDeleteComplete?.();
    }
    setDeleteDialogOpen(false);
  };

  /* FILTERS */
  const handleFilterChange = (key: string, value: string) => {
    const updated = { ...filterValues, [key]: value };
    setFilterValues(updated);
    onFiltersChange(updated);
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      {/* FILTERS */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {filters.map((filter: FilterConfig) => (
            <div key={filter.key} className="flex flex-col">
              <label className="text-sm text-muted-foreground mb-1">
                {filter.label ??
                  filter.key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (x) => x.toUpperCase())}
              </label>

              {filter.type === "input" ? (
                <Input
                  placeholder={filter.placeholder}
                  className="w-48 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  value={filterValues[filter.key] || ""}
                  onChange={(e) =>
                    handleFilterChange(filter.key, e.target.value)
                  }
                />
              ) : (
                <Select
                  value={filterValues[filter.key] || "__all__"}
                  onValueChange={(v) =>
                    handleFilterChange(filter.key, v === "__all__" ? "" : v)
                  }
                >
                  <SelectTrigger className="w-48 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <SelectValue placeholder={filter.placeholder} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="__all__">All</SelectItem>

                    {(filter.options ?? []).map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TABLE */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mt-5 bg-white dark:bg-gray-900 shadow-sm">
        <ShadTable>
          <TableHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col}
                  className="capitalize text-gray-700 dark:text-gray-200"
                >
                  {col}
                </TableHead>
              ))}
              <TableHead className="text-right text-gray-700 dark:text-gray-200">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center text-muted-foreground py-6"
                >
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, idx) => (
                <TableRow
                  key={String(row.id ?? row.slug ?? idx)}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {/* DYNAMIC COLUMN RENDERER */}
                  {columns.map((col) => {
                    const value = row[col];

                    // CUSTOM USERS AVATAR COLUMN (Example)
                    if (col === "users" && Array.isArray(row.users)) {
                      const users = row.users as Array<{
                        fullNameEn?: string;
                        profilePicture?: string;
                        slug?: string;
                      }>;

                      return (
                        <TableCell key={col}>
                          <div className="*:data-[slot=avatar]:ring-background flex -space-x-4 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                            {users.slice(0, 3).map((u, i) => (
                              <Link
                                key={u.slug ?? i}
                                href={`/admin/users/${u.slug}/`}
                              >
                                <Avatar
                                  data-slot="avatar"
                                  title={u.fullNameEn}
                                  className="cursor-pointer"
                                >
                                  <AvatarImage
                                    src={u.profilePicture || "/default.png"}
                                  />
                                  <AvatarFallback>
                                    {u.fullNameEn
                                      ?.substring(0, 2)
                                      .toUpperCase() || "??"}
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                            ))}
                            {users.length > 3 && (
                              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 text-xs flex items-center justify-center ring-2 ring-background">
                                +{users.length - 3}
                              </div>
                            )}
                          </div>
                        </TableCell>
                      );
                    }

                    // BOOLEAN LABELS
                    if (typeof value === "boolean") {
                      return (
                        <TableCell key={col}>
                          {value ? (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-full">
                              Inactive
                            </span>
                          )}
                        </TableCell>
                      );
                    }

                    // EMPTY VALUE
                    if (!value) {
                      return (
                        <TableCell key={col}>
                          <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full">
                            N/A
                          </span>
                        </TableCell>
                      );
                    }

                    // DEFAULT
                    return (
                      <TableCell
                        key={col}
                        className="text-gray-700 dark:text-gray-200"
                      >
                        {String(value)}
                      </TableCell>
                    );
                  })}

                  {/* ACTIONS */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="!p-2 cursor-pointer"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {customActions.map((action, index) => {
                          const slug = String(row.slug || row.id || "");
                          const key = `custom-${index}`;

                          if (action.href) {
                            return (
                              <DropdownMenuItem key={key} asChild>
                                <a href={action.href.replace("[slug]", slug)}>
                                  <div className="flex items-center gap-2">
                                    {action.icon} {action.label}
                                  </div>
                                </a>
                              </DropdownMenuItem>
                            );
                          }

                          if (action.onClick && !action.dialog) {
                            return (
                              <DropdownMenuItem
                                key={key}
                                onSelect={(e) => {
                                  e.preventDefault();
                                  action.onClick?.(row);
                                }}
                              >
                                <div className="flex items-center gap-2 cursor-pointer">
                                  {action.icon} {action.label}
                                </div>
                              </DropdownMenuItem>
                            );
                          }

                          if (action.dialog) {
                            return (
                              <Dialog key={key}>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <div className="flex items-center gap-2 cursor-pointer">
                                      {action.icon} {action.label}
                                    </div>
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                {action.dialog(row)}
                              </Dialog>
                            );
                          }

                          return null;
                        })}
                        {row.isAvailable !== "REMOVE" ? (
                          <>
                            {" "}
                            {onView && (
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault();
                                  onView(row);
                                }}
                              >
                                <div className="flex items-center gap-2 cursor-pointer">
                                  <Eye className="h-4 w-4" /> View
                                </div>
                              </DropdownMenuItem>
                            )}
                            {onEdit && (
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault();
                                  onEdit(row);
                                }}
                              >
                                <div className="flex items-center gap-2 cursor-pointer">
                                  <Edit className="h-4 w-4" /> Edit
                                </div>
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault();
                                  confirmDelete(row);
                                }}
                              >
                                <div className="flex items-center gap-2 text-red-500 cursor-pointer">
                                  <Trash2 className="h-4 w-4" /> Delete
                                </div>
                              </DropdownMenuItem>
                            )}
                          </>
                        ) : (
                          <></>
                        )}

                        {/* Recovery action only if book is marked as REMOVE */}
                        {row.isAvailable === "REMOVE" && handleRecovery && (
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              handleRecovery(row);
                            }}
                          >
                            <div className="flex items-center gap-2 text-blue-500 cursor-pointer">
                              <RefreshCw className="h-4 w-4" /> Recover
                            </div>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </ShadTable>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* DELETE DIALOG */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30 z-50" />
          <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {String(selectedRow?.name ?? selectedRow?.title ?? "")}
              </span>
              ?
            </p>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>

              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Yes, Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
