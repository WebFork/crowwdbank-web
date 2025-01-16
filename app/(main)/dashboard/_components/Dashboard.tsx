"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { StartupCard } from "@/components/startup-card";
import { Card } from "@/components/ui/card";

const Dashboard = ({ startups, myStartups }: { startups: Startup[], myStartups: Startup[] }) => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <Link href="/dashboard/register-startup">
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Register Startup
                        </Button>
                    </Link>
                </div>

                <Tabs defaultValue="investments" className="space-y-6">
                    <TabsList className="w-full sm:w-auto">
                        <TabsTrigger value="investments" className="flex-1 sm:flex-none">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            My Investments
                        </TabsTrigger>
                        <TabsTrigger value="startups" className="flex-1 sm:flex-none">
                            <Building2 className="mr-2 h-4 w-4" />
                            My Startups
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="investments" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Example investments - replace with real data */}
                            {startups.map((startup: Startup) => (
                                <StartupCard
                                    key={startup.project_id}
                                    id={startup.project_id}
                                    name={startup.name}
                                    description={startup.description}
                                    invested={parseFloat(startup.raised)}
                                    equity={parseFloat(startup.equity) || 0}
                                    status="Active"
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="startups" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Example registered startups - replace with real data */}
                            {myStartups ? myStartups.map((startup: Startup) => (
                                <StartupCard
                                    key={startup.project_id}
                                    id={startup.project_id}
                                    name={startup.name}
                                    description={startup.description}
                                    invested={parseFloat(startup.raised)}
                                    equity={parseFloat(startup.equity) || 0}
                                    status="Active"
                                />
                            )) : (
                                <Card className="p-8 text-center">
                                    <div className="max-w-md mx-auto">
                                        <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No Startups Registered</h3>
                                        <p className="text-muted-foreground mb-6">
                                            You haven't registered any startups yet. Register your startup to start raising funds from our community of investors.
                                        </p>
                                        <Link href="/dashboard/register-startup">
                                            <Button>
                                                Register Your Startup
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Dashboard;
