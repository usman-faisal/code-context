'use client'
import { Button } from "@/components/ui/button";
import { GithubIcon, StarIcon, GitPullRequestIcon, CodeIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function OpenSource() {
    return (
        <section id="open-source" className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
            <div className="mx-auto max-w-6xl my-32 space-y-12 px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 mx-auto max-w-2xl space-y-8 text-center"
                >
                    <h2 className="text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                        Completely Free & Open Source
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Feel free to contribute to the project by starring the repository on GitHub.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid gap-8 sm:grid-cols-3"
                >
                    <div className="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
                        <div className="rounded-full bg-primary/10 p-3">
                            <StarIcon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Star the Project</h3>
                        <p className="text-sm text-muted-foreground">Show your support by starring our repository on GitHub</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
                        <div className="rounded-full bg-primary/10 p-3">
                            <GitPullRequestIcon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Contribute Code</h3>
                        <p className="text-sm text-muted-foreground">Submit pull requests to help improve the project</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
                        <div className="rounded-full bg-primary/10 p-3">
                            <CodeIcon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Report Issues</h3>
                        <p className="text-sm text-muted-foreground">Help us identify and fix bugs in the codebase</p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center"
                >
                    <Button size="lg" className="group">
                        <GithubIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        <span>View on GitHub</span>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}