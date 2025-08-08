
"use client"
import { motion } from 'framer-motion';

const slideUp = {
    initial: {
        top: 0
    },
    exit: {
        top: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
};

const opacity = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 0.75,
        transition: { duration: 1, delay: 0.2 }
    },
};

export function Preloader() {
    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="h-screen w-screen fixed left-0 top-0 bg-background z-[9999] text-foreground flex items-center justify-center"
        >
            <motion.p
                variants={opacity}
                initial="initial"
                animate="enter"
                className="flex items-center text-4xl md:text-6xl"
            >
                <span className="block w-2.5 h-2.5 md:w-4 md:h-4 bg-primary rounded-full mr-2.5"></span>
                Darshan
            </motion.p>
        </motion.div>
    );
}
