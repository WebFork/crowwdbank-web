"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
    "Fintech",
    "Healthcare",
    "E-commerce",
    "EdTech",
    "Enterprise Software",
    "AI/ML",
    "Renewable Energy",
    "Blockchain",
    "IoT",
    "Other"
];

export default function RegisterStartup() {
    const { toast } = useToast();
    const router = useRouter();
    const [formData, setFormData] = useState({
        companyName: "",
        description: "",
        address: "",
        tan: "",
        registrationId: "",
        category: "",
        target: "",
        valuation: "",
        logo: null as File | null,
        incorporationCertificate: null as File | null,
        pitchDeck: null as File | null,
    });

    const handleFileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                [field]: e.target.files![0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.companyName || !formData.description || !formData.address ||
            !formData.tan || !formData.registrationId || !formData.category ||
            !formData.target || !formData.valuation) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields and upload all required files",
                variant: "destructive",
            });
            return;
        }

        const targetAmount = parseFloat(formData.target);
        if (isNaN(targetAmount) || targetAmount <= 0) {
            toast({
                title: "Invalid Target Amount",
                description: "Please enter a valid target amount",
                variant: "destructive",
            });
            return;
        }


        try {
            const submitFormData = new FormData();

            // Add text fields
            submitFormData.append("companyName", formData.companyName);
            submitFormData.append("description", formData.description);
            submitFormData.append("address", formData.address);
            submitFormData.append("tan", formData.tan);
            submitFormData.append("registrationId", formData.registrationId);
            submitFormData.append("category", formData.category);
            submitFormData.append("target", formData.target);

            // Add files
            if (formData.logo) submitFormData.append("logo", formData.logo);
            if (formData.incorporationCertificate) submitFormData.append("incorporationCertificate", formData.incorporationCertificate);
            if (formData.pitchDeck) submitFormData.append("pitchDeck", formData.pitchDeck);

            await axios.post("/api/startup/register", submitFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast({
                title: "Startup Registration Submitted",
                description: "We'll review your information and get back to you soon.",
            });
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to submit registration. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-4xl mx-auto p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Building2 className="h-8 w-8" />
                    <h1 className="text-3xl font-bold">Register Your Startup</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                                id="companyName"
                                value={formData.companyName}
                                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tan">TAN Number</Label>
                            <Input
                                id="tan"
                                value={formData.tan}
                                onChange={(e) => setFormData(prev => ({ ...prev, tan: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="registrationId">Registration ID</Label>
                            <Input
                                id="registrationId"
                                value={formData.registrationId}
                                onChange={(e) => setFormData(prev => ({ ...prev, registrationId: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="target">Funding Target (₹)</Label>
                        <Input
                            id="target"
                            type="number"
                            min="0"
                            step="1000"
                            value={formData.target}
                            onChange={(e) => setFormData(prev => ({ ...prev, target: e.target.value }))}
                            placeholder="Enter target amount"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="valuation">Company Valuation (₹)</Label>
                        <Input
                            id="valuation"
                            type="number"
                            min="0"
                            step="1000"
                            value={formData.valuation}
                            onChange={(e) => setFormData(prev => ({ ...prev, valuation: e.target.value }))}
                            placeholder="Enter valuation amount"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="min-h-[150px]"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { id: "logo", label: "Company Logo", accept: "image/*" },
                            { id: "incorporationCertificate", label: "Incorporation Certificate", accept: ".pdf" },
                            { id: "pitchDeck", label: "Pitch Deck", accept: ".pdf,.ppt,.pptx" }
                        ].map((field) => (
                            <div key={field.id} className="space-y-2">
                                <Label htmlFor={field.id}>{field.label}</Label>
                                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                    <input
                                        type="file"
                                        id={field.id}
                                        className="hidden"
                                        accept={field.accept}
                                        onChange={handleFileChange(field.id)}
                                    />
                                    <label htmlFor={field.id} className="cursor-pointer">
                                        <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            {formData[field.id as keyof typeof formData]
                                                ? (formData[field.id as keyof typeof formData] as File).name
                                                : `Click to upload ${field.label}`}
                                        </p>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Submit Registration
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
