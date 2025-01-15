"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, TrendingUp, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

// Mock startups data - replace with real data fetching
const startupsData = {
    "1": {
        id: "1",
        name: "EcoTech Solutions",
        description: "EcoTech Solutions is revolutionizing the renewable energy sector with innovative solar technology that increases efficiency by 40% while reducing costs by 30%. Our patented nano-material coating maximizes light absorption and our AI-powered grid management system optimizes energy distribution.",
        valuation: 5000000,
        minInvestment: 100,
        maxInvestment: 50000,
        equity: 15,
        raised: 2000000,
        target: 3000000,
        pitchDeckUrl: "https://example.com/pitch-deck.pdf",
        logoUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
    },
    "2": {
        id: "2",
        name: "HealthAI",
        description: "AI-powered healthcare diagnostics platform revolutionizing patient care with advanced machine learning algorithms.",
        valuation: 3000000,
        minInvestment: 100,
        maxInvestment: 30000,
        equity: 10,
        raised: 1500000,
        target: 2000000,
        pitchDeckUrl: "https://example.com/pitch-deck.pdf",
        logoUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
    },
    "3": {
        id: "3",
        name: "FinanceFlow",
        description: "Next-generation decentralized finance platform making financial services accessible to everyone.",
        valuation: 7000000,
        minInvestment: 100,
        maxInvestment: 70000,
        equity: 8,
        raised: 3000000,
        target: 5000000,
        pitchDeckUrl: "https://example.com/pitch-deck.pdf",
        logoUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    }
};

// export function generateStaticParams() {
//     return Object.keys(startupsData).map((id) => ({
//         id: id,
//     }));
// }

function StartupDetails({ params }: { params: { id: string } }) {
    const startupData = startupsData[params.id as keyof typeof startupsData];
    const [investmentAmount, setInvestmentAmount] = useState("");
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([
        { role: "assistant", content: `Hi! I'm your AI assistant. I can help you learn more about ${startupData.name}. What would you like to know?` }
    ]);
    const { toast } = useToast();

    const handleInvest = () => {
        const amount = parseFloat(investmentAmount);
        if (isNaN(amount) || amount < startupData.minInvestment || amount > startupData.maxInvestment) {
            toast({
                title: "Invalid Investment Amount",
                description: `Please enter an amount between ₹${startupData.minInvestment} and ₹${startupData.maxInvestment}`,
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Investment Initiated",
            description: "You'll be redirected to complete the payment process.",
        });
    };

    const handleSendMessage = () => {
        if (!message.trim()) return;

        setChatMessages(prev => [...prev, { role: "user", content: message }]);
        setMessage("");

        // Simulate AI response
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                role: "assistant",
                content: `I understand you're interested in ${startupData.name}. Their innovative technology has shown remarkable results in pilot projects. Would you like to know more about their technology or business model?`
            }]);
        }, 1000);
    };

    if (!startupData) {
        return <div className="container mx-auto py-8">Startup not found</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Startup Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={startupData.logoUrl}
                                alt={startupData.name}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <h1 className="text-3xl font-bold">{startupData.name}</h1>
                                <p className="text-muted-foreground">Renewable Energy • Series A</p>
                            </div>
                        </div>

                        <p className="text-lg mb-6">{startupData.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Valuation</p>
                                <p className="font-semibold">₹{startupData.valuation.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Equity Offered</p>
                                <p className="font-semibold">{startupData.equity}%</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Raised</p>
                                <p className="font-semibold">₹{startupData.raised.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Target</p>
                                <p className="font-semibold">₹{startupData.target.toLocaleString()}</p>
                            </div>
                        </div>

                        <Button className="w-full" onClick={() => window.open(startupData.pitchDeckUrl)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Pitch Deck
                        </Button>
                    </Card>

                    {/* Chat Interface */}
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageCircle className="h-5 w-5" />
                            <h2 className="text-xl font-semibold">Ask AI Assistant</h2>
                        </div>

                        <ScrollArea className="h-[400px] mb-4 pr-4">
                            <div className="space-y-4">
                                {chatMessages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg p-3 ${msg.role === "user"
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="flex gap-2">
                            <Input
                                placeholder="Ask anything about the startup..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            />
                            <Button onClick={handleSendMessage}>Send</Button>
                        </div>
                    </Card>
                </div>

                {/* Investment Panel */}
                <Card className="p-6 h-fit">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Invest Now</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="investment">Investment Amount (₹)</Label>
                            <Input
                                id="investment"
                                type="number"
                                placeholder="Enter amount"
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(e.target.value)}
                            />
                            <p className="text-sm text-muted-foreground mt-1">
                                Min: ₹{startupData.minInvestment.toLocaleString()} •
                                Max: ₹{startupData.maxInvestment.toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground mb-1">You will receive</p>
                            <p className="font-semibold text-lg">
                                {investmentAmount
                                    ? `${((parseFloat(investmentAmount) / startupData.valuation) * 100).toFixed(4)}%`
                                    : "0%"} equity
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Button className="w-full" size="lg" onClick={handleInvest}>
                                Invest Now
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">
                                By investing, you agree to our terms and conditions
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default StartupDetails;
