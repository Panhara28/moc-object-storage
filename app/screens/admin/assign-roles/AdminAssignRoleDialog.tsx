"use client";

import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { MultiSelect } from "@/components/ui/multiple-select";

import { useToast } from "@/hooks/use-toast"; // ✅ NEW

interface UserItem {
  id: string;
  fullNameEn: string;
}

interface OptionItem {
  value: string;
  label: string;
}

interface AssignRoleDialogProps {
  row: Record<string, any>;
  onSuccess?: () => void;
}

export default function AdminAssignRoleDialog({
  row,
  onSuccess,
}: AssignRoleDialogProps) {
  const { toast } = useToast(); // ✅ NEW

  const [options, setOptions] = useState<OptionItem[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /* ------------------------------------------------------------
     FETCH ALL USERS + PRE-SELECT CURRENT ROLE USERS
  ------------------------------------------------------------ */
  useEffect(() => {
    async function loadData() {
      try {
        const usersRes = await fetch("/api/users/lists");
        const usersJson = await usersRes.json();

        const formattedOptions = (usersJson.data || []).map((u: UserItem) => ({
          value: u.id,
          label: u.fullNameEn,
        }));

        setOptions(formattedOptions);

        const assignedRes = await fetch(`/api/assign-role/lists/${row.slug}`);
        const assignedJson = await assignedRes.json();

        const assignedIds = (assignedJson.data || []).map(
          (u: UserItem) => u.id
        );

        setSelectedValues(assignedIds);
      } catch (error) {
        console.error("Failed to load role assignment data:", error);
      }
    }

    loadData();
  }, [row.slug]);

  /* ------------------------------------------------------------
     SUBMIT ASSIGNMENT
  ------------------------------------------------------------ */
  const handleAssign = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/assign-role/update/${row.slug}`, {
        method: "PATCH",
        body: JSON.stringify({ users: selectedValues }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Role assigned successfully.",
          variant: "success",
        });

        onSuccess?.();
      } else {
        toast({
          title: "Error",
          description: "Failed to assign role.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Server Error",
        description: "Unable to assign role. Try again later.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <DialogContent className="max-w-xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Assign Role</DialogTitle>
      </DialogHeader>

      <div className="space-y-3 mb-4">
        {/* ROLE NAME */}
        <div>
          <Label className="text-muted-foreground text-xs">Role</Label>
          <p className="font-medium">{row.name}</p>
        </div>

        {/* MULTI SELECT USERS */}
        <div>
          <Label className="text-sm font-medium">Select Users</Label>

          <MultiSelect
            options={options}
            onValueChange={setSelectedValues}
            defaultValue={selectedValues}
            placeholder="Choose users..."
            variant="inverted"
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline">Cancel</Button>

        <Button disabled={loading} onClick={handleAssign}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Assign Role"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
