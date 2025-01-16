import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Search,
    FileCheck,
    Wallet,
    TrendingUp,
    ShieldCheck,
    Users,
    Building,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "Browse Startups",
            description: "Explore our curated selection of innovative startups across various sectors."
        },
        {
            icon: FileCheck,
            title: "Complete KYC",
            description: "Quick and secure verification process with PAN and bank account details."
        },
        {
            icon: Wallet,
            title: "Start Investing",
            description: "Invest as little as ₹250 in startups you believe in."
        },
        {
            icon: TrendingUp,
            title: "Track Performance",
            description: "Monitor your investments and startup growth in real-time."
        }
    ];

    const features = [
        {
            icon: ShieldCheck,
            title: "Secure Investments",
            description: "Bank-grade security and regulatory compliance for all transactions."
        },
        {
            icon: Users,
            title: "Community Insights",
            description: "Access expert opinions and connect with fellow investors."
        },
        {
            icon: Building,
            title: "Vetted Startups",
            description: "All startups undergo thorough due diligence before listing."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-20 px-4 bg-muted">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Investing in Startups
                        <span className="text-primary"> Made Simple</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of investors backing the next generation of innovative startups.
                        Start your investment journey in just a few simple steps.
                    </p>
                    <Link href="/dashboard">
                        <Button size="lg" className="text-lg">
                            Get Started
                            <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">How to Start Investing</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <Card key={index} className="p-6 text-center">
                                <div className="mb-4 flex justify-center">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <step.icon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-muted">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose LaunchVest</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="p-6">
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "What is the minimum investment amount?",
                                a: "You can start investing with as little as ₹250. This low entry barrier makes startup investment accessible to everyone."
                            },
                            {
                                q: "How are startups vetted?",
                                a: "Our team conducts thorough due diligence on each startup, reviewing their business model, financials, team, and market potential."
                            },
                            {
                                q: "How do I track my investments?",
                                a: "Through your dashboard, you can monitor your portfolio performance, receive updates from startups, and track important milestones."
                            },
                            {
                                q: "What happens to my investment?",
                                a: "Your investment buys you equity in the startup. You can earn returns through dividends or when the startup gets acquired or goes public."
                            }
                        ].map((faq, index) => (
                            <Card key={index} className="p-6">
                                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-muted">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Investing?</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Join Crowwd Bank today and be part of the next big success story.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/startups">
                            <Button size="lg" variant="outline" className="text-lg">
                                Browse Startups
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button size="lg" className="text-lg">
                                Create Account
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
