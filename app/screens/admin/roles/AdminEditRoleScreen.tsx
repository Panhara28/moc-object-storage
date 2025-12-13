"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AdminEditRoleScreen({ role }: { role: any }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ⭐ INITIAL FORM STATE
  const [form, setForm] = useState({
    name: role.name ?? "",
    description: role.description ?? "",
  });

  // ⭐ SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      description: form.description,
    };

    try {
      const res = await fetch(`/api/roles/update/${role.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API Error");
      const json = await res.json();

      toast({
        title: "Role Updated",
        description: json.message || "Role updated successfully.",
        variant: "success",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to update role.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Role</h1>
            <p className="text-sm text-muted-foreground">
              Update role name and description
            </p>
          </div>

          <Link
            href="/admin/assign-roles"
            className="px-4 py-2 border rounded-lg"
          >
            Back
          </Link>
        </div>

        <hr className="mb-5" />

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Role Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md h-28"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <Link
              href="/admin/assign-roles"
              className="px-4 py-2 rounded-md border"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
