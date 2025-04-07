'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth-actions";
import { Home, LayoutDashboard, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function DashboardNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-4 flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Home className="h-5 w-5" />
                        <span className="font-bold">Home</span>
                    </Link>
                </div>
                
                <div className="flex md:hidden ml-auto">
                    <Button variant="ghost" size="sm" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
                
                <div className="hidden md:flex flex-1 items-center justify-between space-x-2 md:justify-end">
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
            
            {isMenuOpen && (
                <div className="md:hidden absolute top-14 left-0 right-0 bg-background border-b shadow-md z-10">
                    <div className="container px-4 py-2 flex flex-col space-y-2">
                        <Button variant="ghost" size="sm" asChild className="justify-start">
                            <Link href="/dashboard" className="flex items-center">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="justify-start">
                            <Link href="/dashboard/settings" className="flex items-center">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Link>
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => signout()}
                            className="flex items-center justify-start text-destructive hover:text-destructive"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}