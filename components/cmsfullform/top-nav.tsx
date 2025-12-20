"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  ChevronDown,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";

export default function TopNav() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // Fetch logged-in user
  // -------------------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          // Session expired → redirect to login
          window.location.href = "/auth/login";
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        window.location.href = "/auth/login";
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // -------------------------------
  // Logout
  // -------------------------------
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/auth/login";
  };

  const handleMenuToggle = () => {
    if (typeof window !== "undefined" && (window as any).toggleMenuState) {
      (window as any).toggleMenuState();
    }
  };

  const handleMobileMenuToggle = () => {
    if (typeof window !== "undefined" && (window as any).setIsMobileMenuOpen) {
      const currentState = (window as any).isMobileMenuOpen || false;
      (window as any).setIsMobileMenuOpen(!currentState);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between h-full px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {/* Desktop Menu */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMenuToggle}
          className="hidden lg:flex p-2"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Mobile Menu */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMobileMenuToggle}
          className="lg:hidden p-2"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <Link
            href="/admin/dashboard"
            className="flex items-center hover:text-gray-900 dark:hover:text-white"
          >
            <Home className="h-4 w-4 mr-1" />
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">CMS</span>
        </nav>
      </div>

      {/* Search */}
      {/* <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 bg-gray-50 dark:bg-gray-800"
          />
        </div>
      </div> */}

      {/* Right side */}
      <div className="flex items-center -space-x-1">
        <ThemeToggle />

        {/* Notifications */}
        {/* <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </Badge>
        </Button> */}

        {/* <Button variant="ghost" size="sm" className="p-2">
          <Settings className="h-4 w-4" />
        </Button> */}

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="no-dark-white flex items-center space-x-2 p-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profilePicture || "/placeholder.svg"} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>

              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role}
                </span>
              </div>

              <ChevronDown className="hidden lg:block h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href="/admin/auth/profile">
                <div className="flex">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </div>
              </Link>
            </DropdownMenuItem>

            {/* <DropdownMenuItem>
              <Link href="/admin/auth/forget-password">
                <div className="flex">
                  <Settings className="mr-2 h-4 w-4" />
                  Forget Password
                </div>
              </Link>
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
