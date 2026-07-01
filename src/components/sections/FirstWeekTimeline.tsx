"use client";

import { motion } from "framer-motion";
import { FIRST_WEEK } from "@/constants";

export function FirstWeekTimeline() {
  return (
    <section className="overflow-hidden bg-white px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--orange)]">
            What happens next
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-[var(--charcoal)] sm:text-4xl">
            Your first week on Howzit.
          </h2>
          <p className="mt-4 max-w-sm text-base text-[var(--warm-500)]">
            No guesswork. Here&apos;s exactly what to expect.
          </p>
        </motion.div>

        {/* Timeline cards — horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6">
          {FIRST_WEEK.map(({ day, title, body }, i) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-[200px] flex-shrink-0 rounded-2xl border border-[var(--warm-200)] bg-[var(--off-white)] p-5 sm:min-w-0"
            >
              <span className="text-xs font-bold text-[var(--orange)]">{day}</span>
              <h3 className="mt-2 text-sm font-black leading-snug text-[var(--charcoal)]">
                {title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--warm-500)]">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
