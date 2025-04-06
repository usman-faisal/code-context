'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth-actions";
import { Home, LayoutDashboard, Settings, LogOut } from "lucide-react";

export default function DashboardNav() {
    return (
        <nav className="w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Home className="h-5 w-5" />
                        <span className="font-bold">Home</span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard" className="flex items-center">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard/settings" className="flex items-center">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Link>
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => signout()}
                            className="flex items-center text-destructive hover:text-destructive"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}