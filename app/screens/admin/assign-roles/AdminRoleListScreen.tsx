"use client";

import DynamicTable from "@/components/table";
import { Fingerprint, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminAssignRoleDialog from "./AdminAssignRoleDialog";
import AdminAssignPermissionDialog from "./AdminAssignPermissionDialog";
import { Button } from "@/components/ui/button";
import { AddRoleDialog } from "./AddRoleDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RoleFilter {
  search: string;
}

interface RoleRow extends Record<string, unknown> {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  users?: { id?: number; fullNameEn?: string | null; profilePicture?: string | null; slug?: string }[];
}

interface RolesAPIResponse {
  data: RoleRow[];
  total: number;
}

export default function AdminRoleListScreen() {
  const [data, setData] = useState<RoleRow[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [canCreateRole, setCanCreateRole] = useState(false);
  const [canViewRole, setCanViewRole] = useState(false);
  const [canEditRole, setCanEditRole] = useState(false);
  const [canDeleteRole, setCanDeleteRole] = useState(false);
  const [canAssignRole, setCanAssignRole] = useState(false);
  const [canUpdatePermissions, setCanUpdatePermissions] = useState(false);

  const [filters, setFilters] = useState<RoleFilter>({
    search: "",
  });

  /* ---------------- View ---------------- */
  const onView = (row: Record<string, unknown>) => {
    router.push(`/admin/roles/${row.slug}`);
  };

  /* ---------------- Edit ---------------- */
  const onEdit = (row: Record<string, unknown>) => {
    router.push(`/admin/roles/${row.slug}/edit`);
  };

  async function handleDelete(user: Record<string, unknown>) {
    try {
      const res = await fetch(`/api/users/${user.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("User deleted");
      await loadRoles();
    } catch {
      toast.error("Failed to delete user");
    }
  }

  const loadRoles = async () => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(pageSize),
      search: filters.search || "",
    });

    const res = await fetch("/api/roles/lists?" + query.toString());
    const json: RolesAPIResponse = await res.json();

    setData(json.data || []);
    setTotal(json.total || 0);
  };

  useEffect(() => {
    loadRoles();
  }, [page, filters]);

  useEffect(() => {
    let active = true;
    const loadPermissions = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          if (active) {
            setCanCreateRole(false);
            setCanViewRole(false);
            setCanEditRole(false);
            setCanDeleteRole(false);
            setCanAssignRole(false);
            setCanUpdatePermissions(false);
          }
          return;
        }
        const data = await res.json();
        const perms = data?.user?.permissions || {};
        if (active) {
          setCanCreateRole(Boolean(perms?.roles?.create));
          setCanViewRole(Boolean(perms?.roles?.read));
          setCanEditRole(Boolean(perms?.roles?.update));
          setCanDeleteRole(Boolean(perms?.roles?.delete));
          setCanAssignRole(Boolean(perms?.roles?.update));
          setCanUpdatePermissions(Boolean(perms?.roles?.update));
        }
      } catch (error) {
        console.error("Failed to load role permissions:", error);
        if (active) {
          setCanCreateRole(false);
          setCanViewRole(false);
          setCanEditRole(false);
          setCanDeleteRole(false);
          setCanAssignRole(false);
          setCanUpdatePermissions(false);
        }
      }
    };

    loadPermissions();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            All Roles
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage and view all users in your system
          </p>
        </div>

        {canCreateRole && (
          <div className="flex gap-2">
            <Button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90 transition-colors text-sm font-medium"
            >
              Add New Role
            </Button>
          </div>
        )}
      </div>

      <hr className="border-gray-200 mb-5" />
      <div className="w-4xl">
        <DynamicTable
          data={data}
          columns={["name", "description", "users"]}
          filters={[
            {
              key: "search",
              type: "input",
              placeholder: "Search name or email",
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
          onDelete={canDeleteRole ? handleDelete : undefined}
          onDeleteComplete={loadRoles}
          onView={canViewRole ? onView : undefined}
          onEdit={canEditRole ? onEdit : undefined}
          customActions={[
            ...(canAssignRole
              ? [
                  {
                    icon: <Users className="w-4 h-4" />,
                    label: "Assign Users",
                    dialog: (row: RoleRow) => (
                      <AdminAssignRoleDialog
                        row={row}
                        onSuccess={() => loadRoles()}
                      />
                    ),
                  },
                ]
              : []),
            ...(canUpdatePermissions
              ? [
                  {
                    icon: <Fingerprint className="w-4 h-4" />,
                    label: "Permission",
                    dialog: (row: RoleRow) => (
                      <AdminAssignPermissionDialog
                        row={row}
                        onSuccess={() => loadRoles()}
                      />
                    ),
                  },
                ]
              : []),
          ]}
        />
      </div>

      <AddRoleDialog
        open={open}
        setOpen={setOpen}
        onSuccess={() => loadRoles()}
      />
    </>
  );
}
