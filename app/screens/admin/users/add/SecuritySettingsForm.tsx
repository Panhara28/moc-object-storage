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
import { Eye, EyeOff } from "lucide-react";

type SecuritySettings = {
  email: string;
  password: string;
  confirmPassword: string;
};

type SecuritySettingsFormProps = {
  data: SecuritySettings;
  onChange: (next: SecuritySettings) => void;
  errors?: Record<string, string>;
};

export function SecuritySettingsForm({
  data,
  onChange,
  errors,
}: SecuritySettingsFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Information</CardTitle>
        <CardDescription>Set up the user's email and password</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* EMAIL */}
        <div className="space-y-2">
          <Label>
            Email Address <span className="text-destructive">*</span>
          </Label>

          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="user@example.com"
            className={
              errors?.email
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />

          {errors?.email && (
            <p className="text-destructive text-xs">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <Label>
            Password <span className="text-destructive">*</span>
          </Label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
              placeholder="Enter password"
              className={`pr-10 ${
                errors?.password
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {errors?.password && (
            <p className="text-destructive text-xs">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="space-y-2">
          <Label>
            Confirm Password <span className="text-destructive">*</span>
          </Label>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmPassword}
              onChange={(e) =>
                onChange({ ...data, confirmPassword: e.target.value })
              }
              placeholder="Repeat password"
              className={`pr-10 ${
                errors?.confirmPassword
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {errors?.confirmPassword && (
            <p className="text-destructive text-xs">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
