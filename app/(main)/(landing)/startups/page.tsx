import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Search } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Startup {
    project_id: string;
    ext_id: string;
    name: string;
    category: string;
    description: string;
    logo_url: string;
    target: string;
    raised: string;
    equity: string;
}

export default async function StartupsList() {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch/projects`);
    const startups = data.data.projects;

    if (!startups) {
        return <div>Loading...</div>
    }

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
                    {startups.map((startup: Startup) => (
                        <Link key={startup.project_id} href={`/startups/${startup.project_id}`}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                                <img
                                    src={startup.logo_url}
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
                                                    width: `${(parseFloat(startup.raised) / parseFloat(startup.target)) * 100}%`,
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Target</span>
                                            <span className="font-medium">₹{startup.target ? startup.target.toLocaleString() : 500000}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-sm font-medium">{startup.category}</span>
                                        {startup.equity && (
                                            <span className="text-sm font-medium text-primary">{startup.equity}% equity</span>
                                        )}
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
