import AuthenticatedRoute from "@/components/layout/authenticated-route"
import DashboardNav from "./components/dashboard-nav"
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Dashboard",
        description: "Dashboard",
    }
}
  

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    
    return (
        <AuthenticatedRoute>
                <DashboardNav />
                {children}
        </AuthenticatedRoute>
    )
}