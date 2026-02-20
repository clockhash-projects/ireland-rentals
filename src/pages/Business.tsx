import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Briefcase, Rocket, Globe, ShieldCheck } from "lucide-react";
import { apiClient } from "@/api/axios";
import { Honeypot } from "@/components/Honeypot";

export default function Business() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        interest_type: "",
        message: "",
        website: "" // Honeypot
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.interest_type) {
            toast.error("Please select an interest type");
            return;
        }

        setIsSubmitting(true);
        try {
            await apiClient.post("/business-inquiries/", formData);
            toast.success("Thanks for submitting. Our team will be in touch with you soon");
            setFormData({
                full_name: "",
                email: "",
                interest_type: "",
                message: "",
                website: ""
            });
        } catch (error) {
            console.error("Inquiry submission failed:", error);
            toast.error("Failed to send inquiry. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-[#0a2e1f] text-white">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500 blur-[120px]" />
                </div>

                <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6 fade-in-up">
                        <Rocket className="h-3.5 w-3.5" />
                        Venture Opportunities
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight fade-in-up [animation-delay:100ms]">
                        Build the Future of <br />
                        <span className="text-emerald-400">Irish Real Estate Tech</span>
                    </h1>
                    <p className="text-emerald-50/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed fade-in-up [animation-delay:200ms]">
                        Are you looking to acquire this platform or build a similar rental ecosystem? We provide the technology, data, and expertise to scale.
                    </p>
                </div>
            </section>

            {/* Grid Content */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Why Partner With Us */}
                    <div className="space-y-12 fade-in-up [animation-delay:300ms]">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight mb-4">Why Partner With Us?</h2>
                            <p className="text-muted-foreground">Successfully connecting thousands of tenants with landlords across Ireland with premium technology.</p>
                        </div>

                        <div className="grid gap-8">
                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600">
                                    <Globe className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Scalable Architecture</h3>
                                    <p className="text-sm text-muted-foreground">Built with a modern stack (FastAPI, React, Vite) designed for high performance and rapid expansion.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Secure & Trusted</h3>
                                    <p className="text-sm text-muted-foreground">Integrated auth systems and image verification processes ensuring a safe classifieds environment.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Monetization Ready</h3>
                                    <p className="text-sm text-muted-foreground">Features built for sponsored listings, professional verification, and premium placements.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Form */}
                    <div className="glass p-8 md:p-10 rounded-[2rem] border-emerald-100 fade-in-up [animation-delay:400ms]">
                        <h2 className="text-2xl font-bold mb-2">Business Inquiry</h2>
                        <p className="text-sm text-muted-foreground mb-8">Fill out the form below and our strategy team will reach out to you.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                                    <Input
                                        placeholder="John Doe"
                                        required
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        className="rounded-xl h-12 bg-white/50 border-emerald-50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="john@company.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="rounded-xl h-12 bg-white/50 border-emerald-50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Interest Type</label>
                                <Select
                                    value={formData.interest_type}
                                    onValueChange={(value) => setFormData({ ...formData, interest_type: value })}
                                    required
                                >
                                    <SelectTrigger className="rounded-xl h-12 bg-white/50 border-emerald-50 text-left">
                                        <SelectValue placeholder="Select interest" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="acquisition">Acquire this Platform</SelectItem>
                                        <SelectItem value="build">Build a Similar Platform</SelectItem>
                                        <SelectItem value="partnership">Strategic Partnership</SelectItem>
                                        <SelectItem value="other">Other Inquiry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Message</label>
                                <Textarea
                                    placeholder="Tell us about your requirements or vision..."
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="min-h-[120px] rounded-xl bg-white/50 border-emerald-50 resize-none"
                                />
                            </div>

                            <Honeypot
                                value={formData.website}
                                onChange={(val) => setFormData({ ...formData, website: val })}
                            />

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                            >
                                {isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
