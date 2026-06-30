"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/animations/variants";
import { ProductDemo } from "@/components/sections/ProductDemo";

export const Solution = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="overflow-hidden bg-white px-6 py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center lg:text-left"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-[var(--charcoal)] sm:text-4xl">
            The easiest way for ambitious South Africans to meet the people and
            opportunities that change lives.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center"
        >
          <ProductDemo />
        </motion.div>
      </div>
    </section>
  );
});

Solution.displayName = "Solution";
