"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface UserInfo {
  profileImage: string | null;
  fullNameEn: string;
  fullNameKh: string;
  gender: string; // "", "male", "female", "other"
  generalDepartment: string;
  department: string;
  office: string;
  phoneNumber: string;
  currentRole: string;
}

interface Props {
  data: UserInfo;
  onChange: (value: UserInfo) => void;
  errors: Record<string, string>;
}

export function UserInformationForm({ data, onChange, errors }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadImage = async () => {
      setUploadError(null);
      setUploading(true);

      const formData = new FormData();
      formData.append("files", file);
      formData.append("bucket", "profile-avatars");

      try {
        const res = await fetch("/api/multiple-upload/upload", {
          method: "POST",
          body: formData,
          headers: { "x-ui-request": "true" },
        });

        const json = await res.json();
        const url = json?.uploads?.[0]?.url as string | undefined;

        if (!res.ok || !url) {
          throw new Error("Upload failed");
        }

        onChange({ ...data, profileImage: url });
      } catch (err) {
        setUploadError("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
      }
    };

    uploadImage();
  };

  return (
    <Card className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>Enter basic profile details</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="space-y-3">
          <Label>Profile Picture</Label>

          <div className="flex items-center gap-4">
            {data.profileImage ? (
              <img
                src={data.profileImage}
                className="w-24 h-24 rounded-lg object-cover border"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center border rounded-lg border-dashed">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
            )}

            <div>
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                hidden
                onChange={handleUpload}
              />
              <label
                htmlFor="profile-picture"
                className="px-4 py-2 border rounded-md cursor-pointer text-sm"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </label>
            </div>
          </div>

          {uploadError && (
            <p className="text-sm text-red-600">{uploadError}</p>
          )}
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Full Name EN */}
          <FormInput
            label="Full Name (English)"
            required
            value={data.fullNameEn}
            error={errors.fullNameEn}
            onChange={(val) => onChange({ ...data, fullNameEn: val })}
          />

          {/* Full Name KH */}
          <FormInput
            label="Full Name (Khmer)"
            required
            value={data.fullNameKh}
            error={errors.fullNameKh}
            onChange={(val) => onChange({ ...data, fullNameKh: val })}
          />

          {/* Gender */}
          <div className="space-y-2">
            <Label>
              Gender <span className="text-red-500">*</span>
            </Label>

            <Select
              value={data.gender || ""} // 🔥 never undefined
              onValueChange={(v) => onChange({ ...data, gender: v })}
            >
              <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender}</p>
            )}
          </div>

          {/* Remaining Inputs */}
          <FormInput
            label="Phone Number"
            required
            value={data.phoneNumber}
            error={errors.phoneNumber}
            onChange={(val) => onChange({ ...data, phoneNumber: val })}
          />

          <FormInput
            label="General Department"
            required
            value={data.generalDepartment}
            error={errors.generalDepartment}
            onChange={(val) => onChange({ ...data, generalDepartment: val })}
          />

          <FormInput
            label="Department"
            required
            value={data.department}
            error={errors.department}
            onChange={(val) => onChange({ ...data, department: val })}
          />

          <FormInput
            label="Office"
            required
            value={data.office}
            error={errors.office}
            onChange={(val) => onChange({ ...data, office: val })}
          />

          <FormInput
            label="Current Role"
            required
            value={data.currentRole}
            error={errors.currentRole}
            onChange={(val) => onChange({ ...data, currentRole: val })}
          />
        </div>
      </CardContent>
    </Card>
  );
}

/* Reusable Input */
function FormInput({
  label,
  required,
  value,
  error,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
