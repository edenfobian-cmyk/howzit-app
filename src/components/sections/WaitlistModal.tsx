"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { waitlistSchema, type WaitlistFormValues } from "@/lib/validations";
import { LOOKING_FOR_OPTIONS } from "@/constants";
import { cn } from "@/lib/utils";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    window.setTimeout(() => {
      reset();
      setStatus("idle");
    }, 300);
  };

  const inputClass = (hasError?: boolean) =>
    cn(
      "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[var(--charcoal)] placeholder-[var(--grey-500)]/60 outline-none transition-all duration-200",
      "focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange-ring)]",
      hasError ? "border-red-400" : "border-[var(--border)]"
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[var(--charcoal)]/45"
            onClick={handleClose}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full p-2 text-[var(--grey-500)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--charcoal)]"
              >
                <X size={18} />
              </button>

              <div className="p-8">
                {(status === "success" || status === "duplicate") ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                      className="mb-6 flex justify-center"
                    >
                      <CheckCircle2 size={52} className="text-[var(--orange)]" strokeWidth={1.5} />
                    </motion.div>
                    {status === "duplicate" ? (
                      <>
                        <h3 className="text-2xl font-black text-[var(--charcoal)]">You&apos;re already in.</h3>
                        <p className="mt-3 leading-relaxed text-[var(--grey-500)]">
                          We&apos;ll keep you updated as we build South Africa&apos;s biggest opportunity network.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-black text-[var(--charcoal)]">You&apos;re in.</h3>
                        <p className="mt-3 leading-relaxed text-[var(--grey-500)]">
                          We&apos;ll keep you updated as we build South Africa&apos;s biggest opportunity network.
                        </p>
                      </>
                    )}
                    <button
                      onClick={handleClose}
                      className="mt-8 rounded-full bg-[var(--orange)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-7">
                      <h2 className="text-2xl font-black text-[var(--charcoal)]">Join the waitlist</h2>
                      <p className="mt-1 text-sm text-[var(--grey-500)]">Be first when Howzit launches.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[var(--charcoal)]">
                            First name
                          </label>
                          <input
                            {...register("first_name")}
                            placeholder="Sipho"
                            className={inputClass(!!errors.first_name)}
                          />
                          {errors.first_name && (
                            <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[var(--charcoal)]">
                            Surname
                          </label>
                          <input
                            {...register("surname")}
                            placeholder="Dlamini"
                            className={inputClass(!!errors.surname)}
                          />
                          {errors.surname && (
                            <p className="mt-1 text-xs text-red-500">{errors.surname.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[var(--charcoal)]">
                          Email address
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="sipho@email.com"
                          className={inputClass(!!errors.email)}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[var(--charcoal)]">Age</label>
                          <input
                            {...register("age", { valueAsNumber: true })}
                            type="number"
                            inputMode="numeric"
                            placeholder="24"
                            className={inputClass(!!errors.age)}
                          />
                          {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-[var(--charcoal)]">
                            Looking for
                          </label>
                          <select
                            {...register("looking_for")}
                            defaultValue=""
                            className={cn(inputClass(!!errors.looking_for), "appearance-none cursor-pointer")}
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            {LOOKING_FOR_OPTIONS.map(({ value, label }) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                          {errors.looking_for && (
                            <p className="mt-1 text-xs text-red-500">{errors.looking_for.message}</p>
                          )}
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                          Something went wrong. Please try again.
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--orange)] py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
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

                      <p className="text-center text-xs text-[var(--grey-500)]">
                        We&apos;ll only email important updates.
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
