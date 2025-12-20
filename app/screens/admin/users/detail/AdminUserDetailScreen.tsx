"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface UserData {
  slug: string;
  profilePicture: string;
  name: string;
  fullNameKh: string;
  fullNameEn: string;
  gender: string;
  generalDepartment: string;
  department: string;
  office: string;
  phoneNumber: string;
  currentRole: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDetailContentProps {
  user: UserData;
}

export default function AdminUserDetailScreen({
  user,
}: UserDetailContentProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <div className="mx-auto space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">User Details</h1>
        </div>

        {/* Profile Card */}
        <Card className="border-border relative">
          <CardHeader className="pb-4">
            {/* 🔥 Edit Button (Top-right) */}
            <div className="absolute right-4 top-4">
              <Link href={`/admin/users/${user.slug}/edit`}>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user.profilePicture || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {user.currentRole}
                </Badge>
                <p className="text-sm text-muted-foreground">ID: {user.slug}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Full Name (English)
                    </p>
                    <p className="text-foreground">{user.fullNameEn}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Full Name (Khmer)
                    </p>
                    <p className="text-foreground">{user.fullNameKh}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Gender
                    </p>
                    <p className="text-foreground capitalize">
                      {user.gender ? user.gender.toLowerCase() : "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="text-foreground">{user.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Organization */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Organization
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Current Role
                    </p>
                    <p className="text-foreground">{user.currentRole}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      General Department
                    </p>
                    <p className="text-foreground">{user.generalDepartment}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Department
                    </p>
                    <p className="text-foreground">{user.department}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Office
                    </p>
                    <p className="text-foreground">{user.office}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Account Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Account Timeline
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Created At
                    </p>
                    <p className="text-foreground text-sm">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="text-foreground text-sm">
                      {formatDate(user.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Slug */}
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  User Slug
                </p>
                <p className="font-mono text-sm text-foreground break-all">
                  {user.slug}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
