export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <header className="flex items-center justify-between py-4 px-8">
            {children}
        </header>
    )
}