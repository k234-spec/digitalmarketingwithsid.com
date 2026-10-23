"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validations";
import { serviceLinks, brand } from "@/data/site";
import { Container } from "@/ui/Container";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { Textarea } from "@/ui/Textarea";
import { Button } from "@/ui/Button";
import { Reveal } from "@/motion/Reveal";
import { trackEvent } from "@/lib/analytics";
import { getInquiryWhatsAppUrl } from "@/lib/whatsapp";
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageSquare,
  ArrowUpRight,
  Send,
} from "lucide-react";

export const ContactCTA: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [autoOpenWhatsApp, setAutoOpenWhatsApp] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
      service: "",
      budget: "",
      projectGoals: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus("submitting");
    setErrorMessage("");
    trackEvent("contact_form_submit", { service: data.service });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit request. Please try again.");
      }

      const generatedWaUrl =
        result.whatsappUrl ||
        getInquiryWhatsAppUrl(data, result.submissionId);

      setSubmissionStatus("success");
      setSubmissionId(result.submissionId || "");
      setWhatsappUrl(generatedWaUrl);
      setSubmittedData(data);
      trackEvent("contact_form_success", { service: data.service });

      if (autoOpenWhatsApp && typeof window !== "undefined") {
        window.open(generatedWaUrl, "_blank", "noopener,noreferrer");
      }

      reset();
    } catch (err: unknown) {
      setSubmissionStatus("error");
      const msg = err instanceof Error ? err.message : "Submission error. Please check your network and retry.";
      setErrorMessage(msg);
    }
  };

  const serviceOptions = serviceLinks.map((s) => ({
    label: s.label,
    value: s.label,
  }));

  const budgetOptions = [
    { label: "Under ₹1,00,000 / $1,200", value: "Under 1L" },
    { label: "₹1,00,000 – ₹3,00,000 ($1,200 – $3,500)", value: "1L-3L" },
    { label: "₹3,00,000 – ₹7,00,000 ($3,500 – $8,500)", value: "3L-7L" },
    { label: "₹7,00,000+ ($8,500+ Enterprise / Retainer)", value: "7L+" },
  ];

  return (
    <section
      className="py-24 sm:py-32 bg-[#F7F6F2] text-[#17181C] border-t border-[#E5E4E0] relative overflow-hidden"
      id="contact"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#7657FF]/10 via-[#B8A7FF]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-gradient-to-tr from-[#D9FF70]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="eyebrow bg-[#7657FF]/10 border border-[#7657FF]/20 px-3.5 py-1.5 rounded-full text-[#7657FF]">
                <Sparkles className="h-3.5 w-3.5 text-[#7657FF]" />
                <span>START YOUR GROWTH ENGINE</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-[#17181C]">
                Let&apos;s Build Your Next Stage of Growth.
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-body text-[#686B73] text-base sm:text-lg leading-relaxed">
                Tell us where your business is today and where you want it to go. We&apos;ll help identify the right next steps, eliminate acquisition leaks, and build a measurable growth system.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="space-y-4 pt-4 border-t border-[#E5E4E0]">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#7657FF]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#7657FF]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-semibold text-[#17181C]">
                      Diagnostic, Not a Sales Pitch
                    </h4>
                    <p className="text-xs text-[#686B73] mt-0.5">
                      We examine your analytics, technical stack, and commercial goals before proposing scope.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#7657FF]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#7657FF]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-semibold text-[#17181C]">
                      24-Hour Review Turnaround
                    </h4>
                    <p className="text-xs text-[#686B73] mt-0.5">
                      A senior growth partner reviews your submission and prepares strategic observations.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Production-Ready Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <div className="rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-10 shadow-sm">
                {submissionStatus === "success" ? (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="py-6 px-2 sm:px-4 text-center space-y-6 animate-in fade-in duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#7657FF]/15 border border-[#7657FF]/30 flex items-center justify-center mx-auto text-[#7657FF]">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Inquiry Successfully Emailed
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#17181C]">
                        Consultation Request Received!
                      </h3>
                      <p className="text-sm text-[#686B73] max-w-md mx-auto">
                        Thank you{submittedData?.name ? `, ${submittedData.name}` : ""}. Your request has been delivered to our inbox. Our team will review your requirements within 24 business hours.
                      </p>
                      {submissionId && (
                        <p className="font-mono text-xs text-[#8E9199]">
                          Reference ID: <span className="font-semibold text-[#17181C]">{submissionId}</span>
                        </p>
                      )}
                    </div>

                    {/* WhatsApp Forward Card */}
                    {whatsappUrl && (
                      <div className="rounded-2xl border-2 border-[#25D366]/60 bg-gradient-to-b from-[#25D366]/10 via-white to-white p-5 sm:p-6 text-left shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-[#25D366]/30 shrink-0">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-display font-bold text-base text-[#17181C]">
                                WhatsApp Direct Channel
                              </h4>
                              <span className="text-[10px] bg-[#25D366] text-white px-2 py-0.5 rounded-full font-mono font-bold tracking-wide">
                                INSTANT
                              </span>
                            </div>
                            <p className="text-xs text-[#686B73]">
                              Official Desk: <strong className="text-[#17181C] font-mono">+91 78271 69606</strong>
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-[#52555A] leading-relaxed">
                          Want an immediate response? Your inquiry details (company, requirements, and budget) are pre-filled and ready to send to Sid directly on WhatsApp.
                        </p>

                        {/* Query Details Breakdown */}
                        {submittedData && (
                          <div className="bg-[#F7F6F2] border border-[#E5E4E0] rounded-xl p-3.5 text-xs space-y-1.5 font-mono text-[#52555A]">
                            <div className="flex items-center justify-between">
                              <span className="text-[#8E9199]">Company:</span>
                              <span className="font-semibold text-[#17181C] truncate max-w-[220px]">
                                {submittedData.company}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[#8E9199]">Service:</span>
                              <span className="font-semibold text-[#7657FF] truncate max-w-[220px]">
                                {submittedData.service}
                              </span>
                            </div>
                            {submittedData.budget && (
                              <div className="flex items-center justify-between">
                                <span className="text-[#8E9199]">Budget:</span>
                                <span className="font-semibold text-[#17181C]">
                                  {submittedData.budget}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent("whatsapp_click", {
                              source: "inquiry_success_card",
                              phone: "917827169606",
                            })
                          }
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-display font-semibold text-sm shadow-lg shadow-[#25D366]/25 hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Send Query via WhatsApp (+91 78271 69606)</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    )}

                    <div className="pt-2">
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => {
                          setSubmissionStatus("idle");
                          setSubmittedData(null);
                          setWhatsappUrl("");
                        }}
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                    onFocus={() => trackEvent("contact_form_start")}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Name"
                        required
                        placeholder="e.g. Priya Sharma"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                      <Input
                        label="Work Email"
                        type="email"
                        required
                        placeholder="priya@company.com"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Company Name"
                        required
                        placeholder="Apex Technologies"
                        error={errors.company?.message}
                        {...register("company")}
                      />
                      <Input
                        label="Website URL"
                        type="url"
                        placeholder="https://company.com"
                        error={errors.website?.message}
                        {...register("website")}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Select
                        label="Service of Interest"
                        required
                        options={serviceOptions}
                        error={errors.service?.message}
                        {...register("service")}
                      />
                      <Select
                        label="Estimated Budget"
                        options={budgetOptions}
                        error={errors.budget?.message}
                        {...register("budget")}
                      />
                    </div>

                    <Textarea
                      label="Project Goals & Challenges"
                      required
                      rows={4}
                      placeholder="Tell us about your target audience, current pipeline bottlenecks, or upcoming launch milestones..."
                      error={errors.projectGoals?.message}
                      {...register("projectGoals")}
                    />

                    {/* Consent Checkbox */}
                    <div className="space-y-1 pt-1">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-[#E5E4E0] bg-white text-[#7657FF] focus:ring-[#7657FF] accent-[#7657FF]"
                          {...register("consent")}
                        />
                        <span className="text-xs text-[#686B73] leading-normal">
                          I consent to having this agency contact me regarding this business consultation request in accordance with the Privacy Policy.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-xs text-red-500 font-mono pl-7">
                          {errors.consent.message}
                        </p>
                      )}
                    </div>

                    {/* Priority WhatsApp Dispatch Option */}
                    <div className="rounded-2xl border border-[#25D366]/40 bg-[#25D366]/5 p-3.5 flex items-start gap-3 transition-colors hover:bg-[#25D366]/10">
                      <input
                        type="checkbox"
                        id="autoOpenWhatsApp"
                        checked={autoOpenWhatsApp}
                        onChange={(e) => setAutoOpenWhatsApp(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-[#25D366] text-[#25D366] focus:ring-[#25D366] accent-[#25D366] cursor-pointer"
                      />
                      <label
                        htmlFor="autoOpenWhatsApp"
                        className="text-xs text-[#17181C] cursor-pointer leading-relaxed select-none"
                      >
                        <span className="font-semibold text-[#128C7E] flex items-center gap-1.5 flex-wrap">
                          <span>⚡ Priority WhatsApp Channel</span>
                          <span className="text-[10px] bg-[#25D366]/20 text-[#128C7E] px-1.5 py-0.5 rounded-full font-mono font-medium">
                            +91 78271 69606
                          </span>
                        </span>
                        <span className="text-[#686B73] block mt-0.5 text-[11px]">
                          Also prepare my query to open directly on WhatsApp with Sid for an immediate diagnostic consultation.
                        </span>
                      </label>
                    </div>

                    {/* Submission Error Alert */}
                    {submissionStatus === "error" && (
                      <div
                        role="alert"
                        className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                        <div>
                          <strong>Submission Error: </strong>
                          {errorMessage}
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full justify-center"
                        isLoading={submissionStatus === "submitting"}
                      >
                        Request a Consultation
                      </Button>
                      <p className="text-center text-[11px] font-mono text-[#8E9199] mt-3">
                        🔒 No spam. All client data handled in strict confidence.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
