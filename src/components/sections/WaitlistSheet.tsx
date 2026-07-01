"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Loader2, X } from "lucide-react";
import confetti from "canvas-confetti";
import { step1Schema, step2Schema, type Step1Values, type Step2Values } from "@/lib/validations";
import { LOOKING_FOR_OPTIONS, SITE_URL } from "@/constants";
import { cn } from "@/lib/utils";

interface WaitlistSheetProps {
  isOpen: boolean;
  onClose: () => void;
  referredBy?: string;
  onSuccess?: () => void;
}

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

const SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;

function fireConfetti() {
  const count = 180;
  const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 9999 };
  function fire(ratio: number, opts: object) {
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * ratio) });
  }
  fire(0.25, { origin: { x: 0.2, y: 0.6 }, colors: ["#FF6A00", "#1A1815", "#ffffff"] });
  fire(0.25, { origin: { x: 0.8, y: 0.6 }, colors: ["#FF6A00", "#1A1815", "#ffffff"] });
  fire(0.35, { origin: { x: 0.5, y: 0.5 }, colors: ["#FF6A00"] });
}

// ── Input helper ──────────────────────────────────────────────────
function Input({
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all",
        "bg-white text-[var(--charcoal)] placeholder-[var(--warm-500)]/60",
        "focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange-ring)]",
        error ? "border-red-400" : "border-[var(--warm-200)]",
        className
      )}
      {...props}
    />
  );
}

// ── Step 1 ────────────────────────────────────────────────────────
function Step1({
  onNext,
  referredBy,
}: {
  onNext: (data: Step1Values) => void;
  referredBy?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: { referred_by: referredBy },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[var(--charcoal)]">
            First name
          </label>
          <Input
            {...register("first_name")}
            placeholder="Jordan"
            error={!!errors.first_name}
          />
          {errors.first_name && (
            <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[var(--charcoal)]">
            Surname
          </label>
          <Input
            {...register("surname")}
            placeholder="Williams"
            error={!!errors.surname}
          />
          {errors.surname && (
            <p className="mt-1 text-xs text-red-500">{errors.surname.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--charcoal)]">
          Email address
        </label>
        <Input
          {...register("email")}
          type="email"
          placeholder="thando@email.com"
          error={!!errors.email}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--charcoal)]">
          Age
        </label>
        <Input
          {...register("age", { valueAsNumber: true })}
          type="number"
          inputMode="numeric"
          placeholder="22"
          error={!!errors.age}
        />
        {errors.age && (
          <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>
        )}
      </div>

      <input type="hidden" {...register("referred_by")} />

      <button
        type="submit"
        className="mt-2 w-full rounded-2xl bg-[var(--charcoal)] py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-80"
      >
        Next →
      </button>
    </form>
  );
}

// ── Step 2 ────────────────────────────────────────────────────────
function Step2({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: Step2Values) => void;
  isLoading: boolean;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    onSubmit({ looking_for: selected as Step2Values["looking_for"] });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2.5">
        {LOOKING_FOR_OPTIONS.map(({ value, label, emoji }) => {
          const active = selected.includes(value);
          return (
            <motion.button
              key={value}
              type="button"
              onClick={() => toggle(value)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "border-[var(--orange)] bg-[var(--orange)] text-white"
                  : "border-[var(--warm-200)] bg-[var(--warm-100)] text-[var(--charcoal)] hover:border-[var(--orange)]/40"
              )}
            >
              <span>{emoji}</span>
              {label}
              {active && <Check size={13} strokeWidth={2.5} />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full rounded-2xl bg-[var(--orange)] py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(255,106,0,0.3)] transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Joining...
              </span>
            ) : (
              "Join the Founding Members"
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-[var(--warm-500)]">
        We&apos;ll only email you when something important happens.
      </p>
    </div>
  );
}

// ── Success ───────────────────────────────────────────────────────
function SuccessState({
  referralCode,
  isDuplicate,
  onClose,
}: {
  referralCode: string | null;
  isDuplicate: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const referralUrl = referralCode ? `${SITE_URL}/?ref=${referralCode}` : null;

  const handleCopy = async () => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={SPRING}
      className="py-4 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ ...SPRING, delay: 0.1 }}
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--orange)] text-3xl"
      >
        🎉
      </motion.div>

      <h3 className="text-2xl font-black text-[var(--charcoal)]">
        {isDuplicate ? "You're already in." : "You're in."}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--warm-500)]">
        {isDuplicate
          ? "We'll keep you updated."
          : "Welcome to Howzit's founding waitlist."}
      </p>

      {referralUrl && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 rounded-2xl border border-[var(--warm-200)] bg-[var(--warm-100)] p-4"
        >
          <p className="mb-2 text-xs font-semibold text-[var(--charcoal)]">
            Refer 3 friends to unlock an Early Access Badge
          </p>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--warm-200)] bg-white px-3 py-2.5">
            <span className="flex-1 truncate text-xs text-[var(--warm-500)]">
              {referralUrl}
            </span>
            <button
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                copied
                  ? "bg-green-100 text-green-700"
                  : "bg-[var(--charcoal)] text-white hover:opacity-80"
              )}
            >
              {copied ? (
                <>
                  <Check size={11} /> Copied
                </>
              ) : (
                <>
                  <Copy size={11} /> Copy
                </>
              )}
            </button>
          </div>
          <p className="mt-3 text-xs text-[var(--warm-500)]">
            0 / 3 friends referred
          </p>
        </motion.div>
      )}

      <button
        onClick={onClose}
        className="mt-6 rounded-full bg-[var(--charcoal)] px-7 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
      >
        Done
      </button>
    </motion.div>
  );
}

// ── Main Sheet ────────────────────────────────────────────────────
export function WaitlistSheet({ isOpen, onClose, referredBy, onSuccess }: WaitlistSheetProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Values | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const isDuplicate = status === "duplicate";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleStep1 = (data: Step1Values) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleStep2 = async (data: Step2Values) => {
    if (!step1Data) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...step1Data, ...data }),
      });
      const json = await res.json();

      if (res.ok) {
        setReferralCode(json.referral_code ?? null);
        setStatus("success");
        fireConfetti();
        onSuccess?.();
      } else if (json.error === "already_registered") {
        setReferralCode(json.referral_code ?? null);
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
      setStep(1);
      setStep1Data(null);
      setStatus("idle");
      setReferralCode(null);
    }, 350);
  };

  const showSuccess = status === "success" || status === "duplicate";

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
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-[var(--charcoal)]/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={SPRING}
            className="fixed inset-x-0 bottom-0 z-50 sm:inset-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
          >
            <div className="relative w-full max-h-[92vh] overflow-y-auto rounded-t-[2rem] bg-white sm:w-[480px] sm:rounded-3xl shadow-2xl">
              {/* Handle (mobile) */}
              <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-[var(--warm-200)] sm:hidden" />

              {/* Close */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute right-5 top-5 rounded-full p-1.5 text-[var(--warm-500)] transition-colors hover:bg-[var(--warm-100)] hover:text-[var(--charcoal)]"
              >
                <X size={18} />
              </button>

              <div className="p-6 sm:p-8">
                {showSuccess ? (
                  <SuccessState
                    referralCode={referralCode}
                    isDuplicate={isDuplicate}
                    onClose={handleClose}
                  />
                ) : (
                  <>
                    {/* Header */}
                    <div className="mb-6">
                      {/* Step indicator */}
                      <div className="mb-4 flex gap-2">
                        {[1, 2].map((s) => (
                          <div
                            key={s}
                            className={cn(
                              "h-1 flex-1 rounded-full transition-colors duration-300",
                              s <= step ? "bg-[var(--orange)]" : "bg-[var(--warm-200)]"
                            )}
                          />
                        ))}
                      </div>
                      <h2 className="text-xl font-black text-[var(--charcoal)]">
                        {step === 1 ? "Join the founding waitlist" : "What are you looking for?"}
                      </h2>
                      <p className="mt-1 text-sm text-[var(--warm-500)]">
                        {step === 1
                          ? "Be among the first to get access."
                          : "Select everything that applies."}
                      </p>
                    </div>

                    <AnimatePresence mode="wait">
                      {step === 1 ? (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.18 }}
                        >
                          <Step1 onNext={handleStep1} referredBy={referredBy} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.18 }}
                        >
                          <Step2
                            onSubmit={handleStep2}
                            isLoading={status === "loading"}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {status === "error" && (
                      <p className="mt-3 text-center text-xs text-red-500">
                        Something went wrong. Please try again.
                      </p>
                    )}
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
