"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Building2, Users, Briefcase, MapPin } from "lucide-react";
import Image from "next/image";

interface MeUser {
  id: string;
  email: string;
  fullNameEn: string;
  fullNameKh: string;
  gender: string;
  generalDepartment: string;
  department: string;
  office: string;
  phoneNumber: string;
  currentRole: string;
  role?: { name: string };
  profilePicture: string;
}

export default function AdminMeProfileScreen({
  initialUser,
}: {
  initialUser?: MeUser | null;
}) {
  const [user, setUser] = useState<MeUser | null>(initialUser ?? null);
  const [loading, setLoading] = useState(!initialUser); // if SSR provided, skip loading

  /* -----------------------------------------------------
     Fetch Logged-in User ONLY IF no initialUser is passed
  ----------------------------------------------------- */
  useEffect(() => {
    if (initialUser) return; // skip if already have user

    async function loadMe() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const json = await res.json();

        if (json?.user) {
          setUser(json.user);
        } else if (json?.data) {
          setUser(json.data);
        } else {
          console.error("Failed to load profile:", json);
        }
      } catch (err) {
        console.error("❌ Error loading /me:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMe();
  }, [initialUser]);

  /* -----------------------------------------------------
     Loading State
  ----------------------------------------------------- */
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </main>
    );
  }

  /* -----------------------------------------------------
     Error or no data
  ----------------------------------------------------- */
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load user profile.</p>
      </main>
    );
  }

  /* -----------------------------------------------------
     UI Rendering
  ----------------------------------------------------- */
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Profile
          </h1>
          <p className="text-muted-foreground">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted border-2 border-border">
                  <Image
                    src={user.profilePicture || "/placeholder.svg"}
                    alt={
                      user.profilePicture
                        ? `Profile picture of ${user.fullNameEn}`
                        : "Default placeholder image"
                    }
                    fill
                    className="object-cover"
                  />
                </div>

                <Badge
                  variant="outline"
                  className="h-fit text-sm px-3 py-1 bg-primary text-primary-foreground border-0"
                >
                  {user.role?.name || "No Role"}
                </Badge>
              </div>

              <div className="flex-1">
                <CardTitle className="text-2xl">{user.fullNameEn}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {user.currentRole || "No current role assigned"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Contact Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">
                        {user.phoneNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">
                  Personal Information
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="text-foreground font-medium">
                      {user.gender || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">ID</p>
                    <p className="text-foreground font-medium">#{user.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organization Information */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-foreground mb-4">
                Organization Information
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      General Department
                    </p>
                  </div>
                  <p className="text-foreground font-medium ml-6">
                    {user.generalDepartment || "N/A"}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Department</p>
                  </div>
                  <p className="text-foreground font-medium ml-6">
                    {user.department || "N/A"}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Office</p>
                  </div>
                  <p className="text-foreground font-medium ml-6">
                    {user.office || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Role */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Current Role</p>
              </div>
              <p className="text-foreground font-medium">
                {user.currentRole || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
