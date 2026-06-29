"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { waitlistSchema, type WaitlistFormValues } from "@/lib/validations";
import { INTERESTS, AGE_GROUPS, SA_CITIES } from "@/constants";
import { cn } from "@/lib/utils";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { interests: [] },
  });

  const selectedAgeGroup = watch("age_group");
  const selectedInterests = watch("interests") ?? [];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggleInterest = (value: WaitlistFormValues["interests"][number]) => {
    const current = selectedInterests;
    const updated = current.includes(value)
      ? current.filter((i) => i !== value)
      : [...current, value];
    setValue("interests", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: WaitlistFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setSubmittedName(data.first_name);
        setSubmittedCity(data.city);
        setStatus("success");
      } else if (json.error === "already_registered") {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
      setStatus("idle");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F5F5F5] transition-colors text-[#A0A0A0] hover:text-[#0A0A0A]"
              >
                <X size={18} />
              </button>

              <div className="p-8">
                {/* Success state */}
                {(status === "success" || status === "duplicate") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                      className="flex justify-center mb-6"
                    >
                      <CheckCircle size={56} style={{ color: "#FF5500" }} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-2xl font-black text-[#0A0A0A] mb-3">
                      {status === "duplicate"
                        ? "You're already on the list!"
                        : `You're in, ${submittedName}!`}
                    </h3>
                    <p className="text-[#525252] leading-relaxed">
                      {status === "duplicate"
                        ? "We'll see you on launch day. Big things coming."
                        : `We'll notify you when Howzit launches in ${submittedCity}. Big things are coming.`}
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-8 px-6 py-3 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90"
                      style={{ backgroundColor: "#FF5500" }}
                    >
                      Done
                    </button>
                  </motion.div>
                )}

                {/* Form state */}
                {status !== "success" && status !== "duplicate" && (
                  <>
                    <div className="mb-7">
                      <h2 className="text-2xl font-black text-[#0A0A0A] mb-1">
                        Join the waitlist
                      </h2>
                      <p className="text-sm text-[#737373]">
                        Be first when Howzit launches in your city.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
                          First name
                        </label>
                        <input
                          {...register("first_name")}
                          placeholder="Sipho"
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border text-sm bg-white text-[#0A0A0A] placeholder-[#A0A0A0] outline-none transition-all duration-200",
                            "focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10",
                            errors.first_name ? "border-red-400" : "border-[#E5E5E5]"
                          )}
                        />
                        {errors.first_name && (
                          <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
                          Email address
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="sipho@email.com"
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border text-sm bg-white text-[#0A0A0A] placeholder-[#A0A0A0] outline-none transition-all duration-200",
                            "focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10",
                            errors.email ? "border-red-400" : "border-[#E5E5E5]"
                          )}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
                          City
                        </label>
                        <select
                          {...register("city")}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border text-sm bg-white text-[#0A0A0A] outline-none transition-all duration-200 appearance-none cursor-pointer",
                            "focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/10",
                            errors.city ? "border-red-400" : "border-[#E5E5E5]"
                          )}
                          defaultValue=""
                        >
                          <option value="" disabled>Select your city</option>
                          {SA_CITIES.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                        {errors.city && (
                          <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
                        )}
                      </div>

                      {/* Age group */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
                          Age group
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {AGE_GROUPS.map(({ value, label }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setValue("age_group", value, { shouldValidate: true })}
                              className={cn(
                                "py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150",
                                selectedAgeGroup === value
                                  ? "text-white border-[#FF5500]"
                                  : "bg-white text-[#525252] border-[#E5E5E5] hover:border-[#FF5500]/40"
                              )}
                              style={
                                selectedAgeGroup === value
                                  ? { backgroundColor: "#FF5500" }
                                  : {}
                              }
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                        {errors.age_group && (
                          <p className="mt-1 text-xs text-red-500">{errors.age_group.message}</p>
                        )}
                      </div>

                      {/* Interests */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-1.5">
                          I&apos;m looking for{" "}
                          <span className="font-normal text-[#A0A0A0]">(pick all that apply)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {INTERESTS.map(({ value, label, emoji }) => {
                            const isSelected = selectedInterests.includes(value);
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => toggleInterest(value)}
                                className={cn(
                                  "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border transition-all duration-150",
                                  isSelected
                                    ? "text-white border-[#FF5500]"
                                    : "bg-white text-[#525252] border-[#E5E5E5] hover:border-[#FF5500]/40"
                                )}
                                style={isSelected ? { backgroundColor: "#FF5500" } : {}}
                              >
                                <span>{emoji}</span>
                                {label}
                              </button>
                            );
                          })}
                        </div>
                        {errors.interests && (
                          <p className="mt-1 text-xs text-red-500">{errors.interests.message}</p>
                        )}
                      </div>

                      {/* Error state */}
                      {status === "error" && (
                        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                          Something went wrong. Please try again.
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "#FF5500" }}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Joining...
                          </>
                        ) : (
                          <>
                            Join the waitlist
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-[#A0A0A0]">
                        No spam. We only email when something important happens.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
