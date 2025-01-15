"use client"

import { Button } from "@/components/ui/button"
import { PiggyBank } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center space-x-2">
                    <PiggyBank className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl">Crowwd Bank</span>
                </Link>

                <div className="ml-auto flex items-center space-x-4">
                    <Link href="/startups">
                        <Button variant="ghost">Browse Startups</Button>
                    </Link>
                    <Link href="/how-it-works">
                        <Button variant="ghost">How It Works</Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="ghost">Dashboard</Button>
                    </Link>
                    <Link href="/auth">
                        <Button>Get Started</Button>
                    </Link>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}
