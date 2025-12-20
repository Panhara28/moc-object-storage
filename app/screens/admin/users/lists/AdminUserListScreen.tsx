"use client";

import { useEffect, useState } from "react";
import DynamicTable from "@/components/table";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserFilters {
  search: string;
  role: string;
  status: string;
}

interface UserRow {
  id: number;
  slug: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;

  [key: string]: unknown; // ✅ FIX ADDED
}

interface RoleOption {
  label: string;
  value: string;
}

interface UsersAPIResponse {
  data: UserRow[];
  total: number;
}

export default function AdminUserListScreen() {
  const [data, setData] = useState<UserRow[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const router = useRouter();

  const [filters, setFilters] = useState<UserFilters>({
    search: "",
    role: "",
    status: "",
  });

  const [roleOptions, setRoleOptions] = useState<RoleOption[]>([]);

  /* ---------------- View ---------------- */
  const onView = (row: Record<string, unknown>) => {
    router.push(`/admin/users/${row.slug}`);
  };

  /* ---------------- Edit ---------------- */
  const onEdit = (row: Record<string, unknown>) => {
    router.push(`/admin/users/${row.slug}/edit`);
  };

  /* ---------------- Delete ---------------- */
  async function handleDelete(user: Record<string, unknown>) {
    try {
      const res = await fetch(`/api/users/${user.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("User deleted");
      await loadUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  }

  /* ---------------- Load Roles ---------------- */
  const loadRoles = async () => {
    try {
      const res = await fetch("/api/roles/lists");
      const json = await res.json();

      if (json.roles) {
        setRoleOptions(
          json.roles.map(
            (r: { id: number; name: string }): RoleOption => ({
              label: r.name,
              value: String(r.id),
            })
          )
        );
      }
    } catch (err) {
      console.error("Failed to load roles", err);
    }
  };

  /* ---------------- Load Users ---------------- */
  const loadUsers = async () => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(pageSize),
      search: filters.search || "",
      role: filters.role || "",
      status: filters.status || "",
    });

    const res = await fetch("/api/users/lists?" + query.toString());
    const json: UsersAPIResponse = await res.json();

    setData(json.data || []);
    setTotal(json.total || 0);
  };

  useEffect(() => {
    loadRoles();
    loadUsers();
  }, [page, filters]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            All Users
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage and view all users in your system
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/users/add"
            className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
          >
            Add New User
          </Link>
        </div>
      </div>

      <hr className="border-gray-200 mb-5" />

      <DynamicTable
        data={data}
        columns={["name", "email", "role", "isActive"]}
        filters={[
          { key: "search", type: "input", placeholder: "Search name or email" },
          {
            key: "role",
            type: "select",
            placeholder: "Role",
            options: roleOptions,
          },
          {
            key: "status",
            type: "select",
            placeholder: "Status",
            options: [
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ],
          },
        ]}
        pageSize={pageSize}
        total={total}
        currentPage={page}
        onPageChange={setPage}
        onFiltersChange={(updated) =>
          setFilters((prev) => ({
            ...prev,
            ...updated,
          }))
        }
        onDelete={handleDelete}
        onDeleteComplete={loadUsers}
        onView={onView}
        onEdit={onEdit}
      />
    </>
  );
}
