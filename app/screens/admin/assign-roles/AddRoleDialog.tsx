"use client";

import { useState } from "react";
import * as Yup from "yup";
import { ValidationError } from "yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/* ----------------------------------------------------------
   YUP VALIDATION SCHEMA — REQUIRED FIRST
---------------------------------------------------------- */
const RoleSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .required("Role name is required")
    .min(3, "Role name must be at least 3 characters")
    .max(50, "Role name must be less than 50 characters"),
  description: Yup.string().optional(),
});

interface AddRoleDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void; // ⬅️ will trigger your refetch
}

export function AddRoleDialog({
  open,
  setOpen,
  onSuccess,
}: AddRoleDialogProps) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    name: "",
  });

  /* ----------------------------------------------------------
     SUBMIT HANDLER
  ---------------------------------------------------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setErrors({ name: "" });

    try {
      await RoleSchema.validate(form, { abortEarly: false });
    } catch (validationErr: unknown) {
      if (validationErr instanceof ValidationError && validationErr.inner) {
        const newErrors: Record<string, string> = {};
        validationErr.inner.forEach((err) => {
          if (err.path && !newErrors[err.path]) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
      throw validationErr;
    }

    setIsLoading(true);

    const res = await fetch("/api/roles/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setIsLoading(false);

    if (res.ok) {
      toast({
        title: "Role Created",
        description: "The role has been successfully added.",
        variant: "success",
      });

      // Reset & close dialog
      setForm({ name: "", description: "" });
      setOpen(false);

      // Trigger parent refresh (refetch roles list)
      onSuccess?.();
    } else {
      toast({
        title: "Error",
        description: "Failed to create role.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium block mb-1">Role Name</label>

            <Input
              placeholder="Admin, Editor, Viewer..."
              value={form.name}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, name: e.target.value }));
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={
                errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />

            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium block mb-1">
              Description
            </label>
            <Textarea
              placeholder="Describe this role..."
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isLoading} className="w-32">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
