export default function SnippetListWrapper({ children }: { children: React.ReactNode }) {
    return (
        <main className="px-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[calc(100vh-10rem)] md:max-h-[calc(100vh-10rem)]">
            {children}
        </main>
    )
}