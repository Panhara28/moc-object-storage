"use client";

import { useEffect, useState } from "react";

import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/* ------------------------------------------------------------
   TYPES
------------------------------------------------------------ */
interface PermissionItem {
  slug: string;
  moduleId: number;
  module: { id: number; name: string; label: string };
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface AdminAssignPermissionDialogProps {
  row?: Record<string, any>;
  onSuccess?: () => void;
}

/* ------------------------------------------------------------
   COMPONENT
------------------------------------------------------------ */
export default function AdminAssignPermissionDialog({
  row,
  onSuccess,
}: AdminAssignPermissionDialogProps) {
  const [permissions, setPermissions] = useState<PermissionItem[]>([]);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  /* ------------------------------------------------------------
     LOAD PERMISSIONS BY ROLE SLUG
  ------------------------------------------------------------ */
  useEffect(() => {
    if (!row?.slug) return;

    async function loadPermissions() {
      try {
        const res = await fetch(`/api/roles/permissions/${row.slug}`);
        const json = await res.json();

        setPermissions(json.permissions || []);
      } catch (err) {
        console.error("Failed to load permissions:", err);
      }
    }

    loadPermissions();
  }, [row]);

  /* ------------------------------------------------------------
     TOGGLE CHECKBOX
  ------------------------------------------------------------ */
  const toggleValue = (
    slug: string,
    field: "create" | "read" | "update" | "delete"
  ) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.slug === slug ? { ...perm, [field]: !perm[field] } : perm
      )
    );
  };

  /* ------------------------------------------------------------
     SAVE TO API WITH TOAST SUCCESS
  ------------------------------------------------------------ */
  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/roles/permissions/update/${row?.slug}`, {
        method: "PATCH",
        body: JSON.stringify({ permissions }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({
          title: "Permissions Updated",
          description: "All changes have been saved successfully.",
          variant: "success",
        });

        onSuccess?.();
      } else {
        toast({
          title: "Update Failed",
          variant: "destructive",
          description: "Could not update permissions.",
        });
      }
    } catch (err) {
      console.error("Failed to save permissions:", err);

      toast({
        title: "Error",
        variant: "destructive",
        description: "An unexpected error occurred.",
      });
    }

    setLoading(false);
  };

  /* ------------------------------------------------------------
     UI
  ------------------------------------------------------------ */
  return (
    <DialogContent className="max-w-5xl bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold">
          Assign Permissions For ({row!.name})
        </DialogTitle>
      </DialogHeader>

      {/* MATRIX TABLE */}
      <div className="mt-4 border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead className="w-1/4 font-semibold">Module</TableHead>
              <TableHead className="text-center">Create</TableHead>
              <TableHead className="text-center">Read</TableHead>
              <TableHead className="text-center">Update</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {permissions.map((p) => (
              <TableRow
                key={p.slug}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                {/* MODULE LABEL */}
                <TableCell className="font-medium text-sm">
                  {p.module?.label}
                </TableCell>

                {/* CREATE */}
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={p.create}
                    onChange={() => toggleValue(p.slug, "create")}
                    className="h-4 w-4 cursor-pointer border border-gray-400 rounded accent-blue-600"
                  />
                </TableCell>

                {/* READ */}
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={p.read}
                    onChange={() => toggleValue(p.slug, "read")}
                    className="h-4 w-4 cursor-pointer border border-gray-400 rounded accent-blue-600"
                  />
                </TableCell>

                {/* UPDATE */}
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={p.update}
                    onChange={() => toggleValue(p.slug, "update")}
                    className="h-4 w-4 cursor-pointer border border-gray-400 rounded accent-blue-600"
                  />
                </TableCell>

                {/* DELETE */}
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={p.delete}
                    onChange={() => toggleValue(p.slug, "delete")}
                    className="h-4 w-4 cursor-pointer border border-gray-400 rounded accent-blue-600"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogFooter className="mt-5">
        <Button variant="outline">Cancel</Button>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
