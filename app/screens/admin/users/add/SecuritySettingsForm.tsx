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

export function SecuritySettingsForm({ data, onChange, errors }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          Security Information
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Set up the user's email and password
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* EMAIL */}
        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300">
            Email Address <span className="text-red-500">*</span>
          </Label>

          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="user@example.com"
            className={`bg-white dark:bg-gray-900 
                        placeholder:text-gray-400 dark:placeholder:text-gray-500
                        border ${
                          errors?.email
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-700"
                        }`}
          />

          {errors?.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300">
            Password <span className="text-red-500">*</span>
          </Label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
              placeholder="Enter password"
              className={`bg-white dark:bg-gray-900 
                          placeholder:text-gray-400 dark:placeholder:text-gray-500
                          pr-10 border ${
                            errors?.password
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-700"
                          }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {errors?.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300">
            Confirm Password <span className="text-red-500">*</span>
          </Label>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmPassword}
              onChange={(e) =>
                onChange({ ...data, confirmPassword: e.target.value })
              }
              placeholder="Repeat password"
              className={`bg-white dark:bg-gray-900 
                          placeholder:text-gray-400 dark:placeholder:text-gray-500
                          pr-10 border ${
                            errors?.confirmPassword
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-700"
                          }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {errors?.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
