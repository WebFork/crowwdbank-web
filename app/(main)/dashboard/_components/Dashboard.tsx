"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Building2 } from "lucide-react";
import Link from "next/link";
import { StartupCard } from "@/components/startup-card";

const Dashboard = () => {
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
                            <StartupCard
                                id="1"
                                name="EcoTech Solutions"
                                description="Sustainable energy solutions for modern businesses"
                                invested={25000}
                                equity={2.5}
                                status="Active"
                            />
                            <StartupCard
                                id="2"
                                name="HealthAI"
                                description="AI-powered healthcare diagnostics platform"
                                invested={15000}
                                equity={1.5}
                                status="Active"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="startups" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Example registered startups - replace with real data */}
                            <StartupCard
                                id="3"
                                name="TechVenture"
                                description="Your registered startup"
                                invested={0}
                                equity={100}
                                status="Pending Approval"
                                isOwner
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Dashboard;
