"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { StartupCard } from "@/components/startup-card";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { start } from "repl";

const Dashboard = ({ startups, myStartups }: { startups: Startup[], myStartups: Startup[] }) => {
    const [activeTab, setActiveTab] = useState("investments");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStartupId, setSelectedStartupId] = useState<string | null>(null);
    const [netProfit, setNetProfit] = useState("");
    const { toast } = useToast();

    const handleProfitSubmit = async () => {
        const profit = parseFloat(netProfit);
        if (isNaN(profit) || profit < 0) {
            toast({
                title: "Invalid Amount",
                description: "Please enter a valid profit amount",
                variant: "destructive",
            });
            return;
        }

        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mailer`, {
            profit,
            startupId: selectedStartupId,
            // raised: myStartups.find((startup) => startup.project_id === selectedStartupId)?.raised,
        });

        toast({
            title: "Profit Distribution Initiated",
            description: "Investors will be notified of their profit share.",
        });
        setIsDialogOpen(false);
        setNetProfit("");
        setSelectedStartupId(null);
    };

    const handleAddProfit = (startupId: string) => {
        setSelectedStartupId(startupId);
        setIsDialogOpen(true);
    };

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
                            All Startups
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
                                    isOwner
                                    onAddProfit={() => handleAddProfit(startup.project_id)}
                                />
                            )) : (
                                <Card className="p-8 text-center">
                                    <div className="max-w-md mx-auto">
                                        <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No Startups Registered</h3>
                                        <p className="text-muted-foreground mb-6">
                                            You haven&apos;t registered any startups yet. Register your startup to start raising funds from our community of investors.
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
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Distribute Profits</DialogTitle>
                            <DialogDescription>
                                Enter the net profit to distribute among investors based on their equity share.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="netProfit">Net Profit Amount (₹)</Label>
                                <Input
                                    id="netProfit"
                                    type="number"
                                    min="0"
                                    step="1000"
                                    value={netProfit}
                                    onChange={(e) => setNetProfit(e.target.value)}
                                    placeholder="Enter net profit amount"
                                />
                            </div>
                            <Button
                                className="w-full"
                                onClick={handleProfitSubmit}
                                disabled={!netProfit}
                            >
                                Distribute Profit
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Dashboard;
