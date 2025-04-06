import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, Zap } from 'lucide-react'

export default function Features() {
    return (
        <section id="features" className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">Foundation for Code Note Management</h2>
                    <p>CodeNotes is evolving to be more than just a platform. It supports an entire ecosystem for developers and educators to create and share rich, contextual code notes.</p>
                </div>

                <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Fast</h3>
                        </div>
                        <p className="text-sm">Create and share notes in real-time with auto-saving and easy preview options.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Flexible</h3>
                        </div>
                        <p className="text-sm">Add multiple code snippets, write detailed descriptions, and provide inline explanations to make your notes comprehensive.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Fingerprint className="size-4" />

                            <h3 className="text-sm font-medium">Free</h3>
                        </div>
                        <p className="text-sm">CodeNotes is free to use, and you can create unlimited notes.</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs text-muted-foreground">UPCOMING</span>
                        <div className="flex items-center gap-2">
                            <Pencil className="size-4" />

                            <h3 className="text-sm font-medium">Explore</h3>
                        </div>
                        <p className="text-sm">Explore notes created by other users and learn from their code.</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs text-muted-foreground">UPCOMING</span>
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-4" />
                            <h3 className="text-sm font-medium">Inline annotations</h3>
                        </div>
                        <p className="text-sm">Add inline annotations to your notes to help explain the code.</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs text-muted-foreground">UPCOMING</span>
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />
                            <h3 className="text-sm font-medium">Built for AI</h3>
                        </div>
                        <p className="text-sm">CodeNotes is designed to integrate seamlessly with AI tools, allowing you to leverage the power of AI to enhance your notes.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
