import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Search } from "lucide-react";
import Link from "next/link";

// Mock startups data - replace with real data fetching
const startups = [
    {
        id: "1",
        name: "EcoTech Solutions",
        description: "Innovative solar technology with 40% increased efficiency",
        category: "Renewable Energy",
        raised: 2000000,
        target: 3000000,
        equity: 15,
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "2",
        name: "HealthAI",
        description: "AI-powered healthcare diagnostics platform",
        category: "Healthcare",
        raised: 1500000,
        target: 2000000,
        equity: 10,
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "3",
        name: "FinanceFlow",
        description: "Next-generation decentralized finance platform",
        category: "Fintech",
        raised: 3000000,
        target: 5000000,
        equity: 8,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    }
];

export default function StartupsList() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl font-bold">Investment Opportunities</h1>
                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input className="pl-9" placeholder="Search startups..." />
                        </div>
                        <Button variant="outline">
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {startups.map((startup) => (
                        <Link key={startup.id} href={`/startups/${startup.id}`}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                                <img
                                    src={startup.imageUrl}
                                    alt={startup.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-5 w-5 text-primary" />
                                        <h3 className="font-semibold text-lg">{startup.name}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{startup.description}</p>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Raised</span>
                                            <span className="font-medium">₹{startup.raised.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div
                                                className="bg-primary rounded-full h-2"
                                                style={{
                                                    width: `${(startup.raised / startup.target) * 100}%`,
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Target</span>
                                            <span className="font-medium">₹{startup.target.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-sm font-medium">{startup.category}</span>
                                        <span className="text-sm font-medium text-primary">{startup.equity}% equity</span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
