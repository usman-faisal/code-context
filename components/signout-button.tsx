"use client"
import { signout } from "@/lib/auth-actions";
import { Button } from "./ui/button";

export default function SignOutButton() {
    return (
        <Button
            onClick={() => {
                signout();
            }}
        >
            Sign out
        </Button>
    )
}