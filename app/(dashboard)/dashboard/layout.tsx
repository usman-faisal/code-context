import AuthenticatedRoute from "@/components/layout/authenticated-route"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthenticatedRoute>
            {children}
        </AuthenticatedRoute>
    )
}