"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { UserInformationForm } from "./UserInformationForm";
import { SecuritySettingsForm } from "./SecuritySettingsForm";
import { userCreateSchema } from "./userValidation";
import { ValidationError } from "yup";

export default function AdminUserAddScreen() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [userInfo, setUserInfo] = useState({
    profileImage: null as string | null,
    fullNameEn: "",
    fullNameKh: "",
    gender: "",
    generalDepartment: "",
    department: "",
    office: "",
    phoneNumber: "",
    currentRole: "",
  });

  const [securityInfo, setSecurityInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const resetForm = () => {
    setUserInfo({
      profileImage: null,
      fullNameEn: "",
      fullNameKh: "",
      gender: "",
      generalDepartment: "",
      department: "",
      office: "",
      phoneNumber: "",
      currentRole: "",
    });

    setSecurityInfo({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...userInfo,
      ...securityInfo,
      profilePicture: userInfo.profileImage,
      name: userInfo.fullNameEn,
      gender: userInfo.gender.toUpperCase(),
    };

    try {
      await userCreateSchema.validate(payload, { abortEarly: false });
      setErrors({});

      const res = await fetch("/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API Error");

      const json = await res.json();

      resetForm();

      toast({
        title: "Success",
        description: json.message || "User created successfully!",
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
          description: "Failed to create user.",
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
            <h1 className="text-2xl sm:text-3xl font-bold">Create New User</h1>
            <p className="text-sm text-muted-foreground">Manage users</p>
          </div>

          <Link href="/admin/users/lists" className="px-4 py-2 border rounded-lg">
            Back
          </Link>
        </div>

        <hr className="mb-5" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <UserInformationForm data={userInfo} onChange={setUserInfo} errors={errors} />
          <SecuritySettingsForm data={securityInfo} onChange={setSecurityInfo} errors={errors} />

          <div className="flex justify-end gap-3">
            <button type="button" className="px-4 py-2 border rounded-md">Cancel</button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}
