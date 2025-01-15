'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Onboarding = ({ UserId }: { UserId: string }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        panNumber: "",
        panFile: null as File | null,
        accountNumber: "",
        ifscCode: "",
    });
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                panFile: e.target.files![0]
            }));
        }
    };

    const validatePanStep = () => {
        if (!formData.panNumber || !formData.panFile) {
            toast({
                title: "Required Fields Missing",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return false;
        }
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNumber)) {
            toast({
                title: "Invalid PAN Number",
                description: "Please enter a valid PAN number",
                variant: "destructive",
            });
            return false;
        }
        return true;
    };

    const validateBankStep = () => {
        if (!formData.accountNumber || !formData.ifscCode) {
            toast({
                title: "Required Fields Missing",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return false;
        }
        if (!/^\d{9,18}$/.test(formData.accountNumber)) {
            toast({
                title: "Invalid Account Number",
                description: "Please enter a valid account number",
                variant: "destructive",
            });
            return false;
        }
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
            toast({
                title: "Invalid IFSC Code",
                description: "Please enter a valid IFSC code",
                variant: "destructive",
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (validateBankStep()) {
            try {
                await axios.post(`${process.env.API_URL}/onboarding/user_create`, {
                    ext_id: UserId,
                    pan: formData.panNumber,
                    bank_account: formData.accountNumber,
                    bank_ifsc: formData.ifscCode,
                    onboarding_complete: true,
                })
            } catch (e) {
                console.error(e);
                toast({
                    title: "Error Submitting Details",
                    description: "An error occurred while submitting your details. Please try again later.",
                    variant: "destructive",
                });
            }
            toast({
                title: "Verification Submitted",
                description: "We'll review your information and get back to you soon.",
            });
            // Redirect to dashboard or confirmation page
        }
    };

    return (
        <div className="min-h-screen bg-muted py-12 px-4">
            <div className="max-w-md mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center mb-2">Complete Your Profile</h1>
                    <p className="text-center text-muted-foreground">
                        Step {step} of 2: {step === 1 ? "PAN Verification" : "Bank Details"}
                    </p>
                </div>

                <Card className="p-6">
                    {step === 1 ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="panNumber">PAN Number</Label>
                                <Input
                                    id="panNumber"
                                    placeholder="ABCDE1234F"
                                    value={formData.panNumber}
                                    onChange={(e) => setFormData(prev => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
                                    maxLength={10}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="panFile">Upload PAN Card</Label>
                                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                    <input
                                        type="file"
                                        id="panFile"
                                        className="hidden"
                                        accept="image/*,.pdf"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="panFile" className="cursor-pointer">
                                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            {formData.panFile ? formData.panFile.name : "Click to upload PAN card (PDF or Image)"}
                                        </p>
                                    </label>
                                </div>
                            </div>

                            <Button
                                className="w-full"
                                onClick={() => validatePanStep() && setStep(2)}
                            >
                                Next Step
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="accountNumber">Account Number</Label>
                                <Input
                                    id="accountNumber"
                                    placeholder="Enter your account number"
                                    value={formData.accountNumber}
                                    onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ifscCode">IFSC Code</Label>
                                <Input
                                    id="ifscCode"
                                    placeholder="BANK0123456"
                                    value={formData.ifscCode}
                                    onChange={(e) => setFormData(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleSubmit}
                                >
                                    Complete Setup
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Onboarding;
