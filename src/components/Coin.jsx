import { motion } from "framer-motion";

export default function Coin({ visible }) {
  return (
    <motion.div
      aria-hidden={!visible}
      className="absolute left-1/2 top-[53%] z-20 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-amber-200 bg-[radial-gradient(circle_at_32%_28%,#fff7ad_0,#fde047_28%,#f59e0b_64%,#92400e_100%)] shadow-glow sm:h-20 sm:w-20"
      initial={false}
      animate={
        visible
          ? { opacity: 1, scale: [0.4, 1.18, 1], y: [18, -8, 0], rotate: [0, 14, -6, 0] }
          : { opacity: 0, scale: 0.25, y: 18, rotate: -20 }
      }
      transition={{ duration: 0.62, ease: "easeOut" }}
    >
      <motion.span
        className="text-3xl font-black text-amber-900 drop-shadow-sm sm:text-4xl"
        animate={visible ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 1.2, repeat: visible ? Infinity : 0, repeatDelay: 0.4 }}
      >
        $
      </motion.span>
      <span className="coin-shine" />
    </motion.div>
  );
}
