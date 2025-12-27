"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { userUpdateInfovalidation } from "../add/userValidation";
import { UserInformationForm } from "../add/UserInformationForm";
import { ValidationError } from "yup";

type EditableUser = {
  slug: string;
  fullNameEn?: string | null;
  fullNameKh?: string | null;
  gender?: string | null;
  generalDepartment?: string | null;
  department?: string | null;
  office?: string | null;
  phoneNumber?: string | null;
  currentRole?: string | null;
  profilePicture?: string | null;
  profilePictureRaw?: string | null;
};

export default function AdminUserEditScreen({ user }: { user: EditableUser }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [userInfo, setUserInfo] = useState({
    profileImage: user.profilePicture ?? null, // signed URL for display
    profileImageRaw: user.profilePictureRaw ?? user.profilePicture ?? null, // stored URL for payload
    fullNameEn: user.fullNameEn ? user.fullNameEn : "",
    fullNameKh: user.fullNameKh ? user.fullNameKh : "",
    gender: user.gender ? user.gender.toLowerCase() : "",
    generalDepartment: user.generalDepartment ? user.generalDepartment : "",
    department: user.department ? user.department : "",
    office: user.office ? user.office : "",
    phoneNumber: user.phoneNumber ? user.phoneNumber : "",
    currentRole: user.currentRole ? user.currentRole : "",
  });

  // ⭐ SUBMIT UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: Record<string, unknown> = {
      ...userInfo,
      gender: userInfo.gender.toUpperCase(),
      name: userInfo.fullNameEn,
    };

    if (userInfo.profileImageRaw || userInfo.profileImage) {
      payload.profilePicture = userInfo.profileImageRaw ?? userInfo.profileImage;
    }

    try {
      await userUpdateInfovalidation.validate(payload, { abortEarly: false });
      setErrors({});

      const res = await fetch(`/api/users/update/${user.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API Error");

      const json = await res.json();

      toast({
        title: "Updated Successfully",
        description: json.message || "User updated successfully",
        variant: "success",
      });
    } catch (err: unknown) {
      if (err instanceof ValidationError && err.inner) {
        const formatted: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) formatted[e.path] = e.message;
        });
        setErrors(formatted);
        toast({
          title: "Validation Error",
          description: "Please correct the highlighted fields.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update user.",
          variant: "destructive",
        });
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit User</h1>
            <p className="text-sm text-muted-foreground">Update user details</p>
          </div>

          <Link
            href="/admin/users/lists"
            className="px-4 py-2 border rounded-lg"
          >
            Back
          </Link>
        </div>

        <hr className="mb-5" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <UserInformationForm
            data={userInfo}
            onChange={setUserInfo}
            errors={errors}
          />

          <div className="flex justify-end gap-3">
            <Link
              href="/admin/users/lists"
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </Link>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
