"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center"
        >
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg">
              <Image
                src="https://placehold.co/400x400.png"
                alt="Darshan"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                data-ai-hint="professional portrait"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <h2 className="mb-4">About Me</h2>
            <p className="text-base md:text-lg text-secondary-foreground/80 mb-4">
              Hello! I&apos;m Darshan, a passionate developer and designer with a knack for creating dynamic and intuitive web applications. With a strong foundation in front-end technologies and a keen eye for design, I strive to build products that not only look great but also provide a seamless user experience.
            </p>
            <p className="text-base md:text-lg text-secondary-foreground/80">
              My journey in web development started with a simple curiosity for how things work on the internet, and it has since grown into a full-fledged passion for crafting elegant solutions to complex problems. I&apos;m always eager to learn new technologies and improve my skills.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
