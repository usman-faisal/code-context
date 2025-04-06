
'use client'
import { Button } from "@/components/ui/button";
import { GithubIcon,  LinkedinIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
// No need to import Link from "next/link" if only used for external links here

export default function About() {
    return (
        <section id="about" className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
            <div className="mx-auto max-w-6xl my-32 space-y-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 mx-auto max-w-2xl space-y-8 text-center flex flex-col items-center"
                >
                    <h2 className="text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                        About Me
                    </h2>
                    <Image  src="/usman.jpeg" alt="me" width={300} height={300} className="rounded-full" />
                    <p className="text-lg text-muted-foreground">
                        I'm a software engineer with a passion for building products that help people.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center gap-4"
                >
                    {/* GitHub Link using <a> with Button asChild */}
                    <Button size="lg" className="group" asChild>
                        <a // <--- Changed from Link to a
                            className="flex items-center"
                            href="https://github.com/usman-dev-hub"
                            target="_blank" // Optional: Opens in a new tab
                            rel="noopener noreferrer" // Recommended for security with target="_blank"
                        >
                            <GithubIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                            View My GitHub
                        </a>
                    </Button>

                    {/* LinkedIn Link using <a> */}
                    <a // <--- Changed from Link to a
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground hover:text-foreground h-11 px-8" // Added styling similar to Button for consistency, adjust as needed
                        href="https://www.linkedin.com/in/usman-dev-hub/"
                        target="_blank" // Optional: Opens in a new tab
                        rel="noopener noreferrer" // Recommended for security with target="_blank"
                    >
                        <LinkedinIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        Connect on LinkedIn
                    </a>
                </motion.div>
            </div>
        </section>
    );
}


