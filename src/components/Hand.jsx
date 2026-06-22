import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Coin from "./Coin.jsx";
import { getHandAssetSrc } from "./handAssets.js";

const fingerBase = "stroke-[#8d4b2d] stroke-[1.6]";
const nailBase = "fill-[#fff0e8] stroke-[#b9785d] stroke-[1]";

function FallbackHandArt({ side, handState, isCorrect }) {
  const isOpen = handState !== "fist";
  const flip = side === "right" ? "scale-x-[-1]" : "";
  const showCoin = handState === "open-coin";

  const palm = {
    closed: { d: "M107 98 C83 105 70 130 78 154 C88 187 129 204 163 190 C196 176 208 136 191 111 C174 86 139 88 107 98 Z" },
    open: { d: "M105 103 C82 117 76 146 90 170 C106 199 148 207 178 188 C208 169 211 129 187 108 C166 90 132 87 105 103 Z" },
  };

  const thumb = {
    closed: { d: "M89 142 C54 129 42 111 49 98 C58 83 80 102 104 121 Z", rotate: 0, x: 0, y: 0 },
    open: { d: "M92 146 C57 143 29 121 34 104 C40 84 72 99 105 123 Z", rotate: -9, x: -5, y: 4 },
  };

  const fingers = [
    {
      id: "index",
      closed: { x: 86, y: 76, rotate: 70, h: 83 },
      open: { x: 74, y: 21, rotate: -11, h: 122 },
      nail: { x: 83, y: 28 },
    },
    {
      id: "middle",
      closed: { x: 117, y: 65, rotate: 48, h: 91 },
      open: { x: 112, y: 9, rotate: -2, h: 138 },
      nail: { x: 121, y: 16 },
    },
    {
      id: "ring",
      closed: { x: 146, y: 68, rotate: 33, h: 88 },
      open: { x: 149, y: 18, rotate: 8, h: 126 },
      nail: { x: 158, y: 25 },
    },
    {
      id: "pinky",
      closed: { x: 171, y: 82, rotate: 24, h: 70 },
      open: { x: 184, y: 39, rotate: 20, h: 101 },
      nail: { x: 192, y: 46 },
    },
  ];

  return (
    <svg className={`h-full w-full ${flip} drop-shadow-2xl`} viewBox="0 0 240 240" role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`skin-${side}`} x1="45" x2="196" y1="33" y2="204" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffd1b8" />
          <stop offset="0.52" stopColor="#e69a72" />
          <stop offset="1" stopColor="#a45f3f" />
        </linearGradient>
        <radialGradient id={`warm-${side}`} cx="0" cy="0" r="1" gradientTransform="matrix(82 94 -101 88 121 119)">
          <stop stopColor="#ffe0cd" />
          <stop offset="1" stopColor="#d47b55" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      <motion.g
        animate={isCorrect ? { filter: "drop-shadow(0 0 18px rgba(251, 191, 36, 0.75))" } : { filter: "drop-shadow(0 12px 18px rgba(30, 41, 59, 0.24))" }}
        transition={{ duration: 0.3 }}
      >
        {fingers.map((finger) => {
          const pose = isOpen ? finger.open : finger.closed;
          const nailOpacity = isOpen ? 1 : 0.12;

          return (
            <motion.g
              key={finger.id}
              initial={false}
              animate={{ x: pose.x, y: pose.y, rotate: pose.rotate }}
              transition={{ duration: 0.64, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ transformOrigin: "50% 100%" }}
            >
              <motion.rect
                width="30"
                height={pose.h}
                rx="15"
                fill={`url(#skin-${side})`}
                className={fingerBase}
                animate={{ height: pose.h }}
                transition={{ duration: 0.64, ease: [0.2, 0.8, 0.2, 1] }}
              />
              <motion.ellipse
                cx="15"
                cy="13"
                rx="9.5"
                ry="6.5"
                className={nailBase}
                animate={{ opacity: nailOpacity }}
                transition={{ duration: 0.3 }}
              />
              <path d="M7 45 C13 49 18 49 24 45" fill="none" stroke="#b9785d" strokeWidth="1.2" opacity="0.45" />
              <path d="M7 75 C13 79 18 79 24 75" fill="none" stroke="#b9785d" strokeWidth="1.2" opacity="0.35" />
            </motion.g>
          );
        })}

        <motion.path
          initial={false}
          animate={isOpen ? thumb.open : thumb.closed}
          transition={{ duration: 0.62, ease: [0.2, 0.8, 0.2, 1] }}
          fill={`url(#skin-${side})`}
          stroke="#8d4b2d"
          strokeWidth="1.8"
          style={{ transformOrigin: "96px 137px" }}
        />

        <motion.path
          initial={false}
          animate={isOpen ? palm.open : palm.closed}
          transition={{ duration: 0.58, ease: [0.2, 0.8, 0.2, 1] }}
          fill={`url(#skin-${side})`}
          stroke="#8d4b2d"
          strokeWidth="1.8"
        />
        <motion.path
          initial={false}
          animate={{ opacity: isOpen ? 0.65 : 0.16 }}
          d="M110 128 C123 119 151 118 169 133 M103 150 C126 164 153 165 178 150 M119 178 C136 184 152 184 166 176"
          fill="none"
          stroke="#8d4b2d"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path d="M93 175 C104 210 164 219 185 183 C174 201 123 205 93 175 Z" fill={`url(#warm-${side})`} opacity="0.75" />
      </motion.g>

      <motion.circle
        cx="122"
        cy="136"
        r="84"
        fill="none"
        stroke="#fef3c7"
        strokeWidth="3"
        initial={false}
        animate={{ opacity: isOpen ? 0 : 0.75, scale: isOpen ? 1.1 : 0.62 }}
        transition={{ duration: 0.5 }}
      />
      <foreignObject x="0" y="0" width="240" height="240" className={flip}>
        <div className="relative h-full w-full">
          <Coin visible={showCoin} />
        </div>
      </foreignObject>
    </svg>
  );
}

export default function Hand({ side, handState, isSelected, isCorrect, disabled, onChoose }) {
  const label = side === "left" ? "Left Hand" : "Right Hand";
  const src = useMemo(() => getHandAssetSrc(side, handState), [side, handState]);
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [src]);

  return (
    <motion.button
      type="button"
      aria-label={`${label}${disabled ? "" : ", choose this hand"}`}
      disabled={disabled}
      onClick={() => onChoose(side)}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && !disabled) {
          event.preventDefault();
          onChoose(side);
        }
      }}
      className={`group relative flex aspect-square w-[clamp(8.25rem,26vw,11.75rem)] flex-none items-center justify-center overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] outline-none transition-colors focus-visible:ring-4 focus-visible:ring-slate-400 sm:w-[clamp(10.25rem,22vw,14.75rem)] sm:p-3 lg:w-[clamp(11.5rem,18vw,16.5rem)] ${
        disabled ? "cursor-default" : "cursor-pointer hover:bg-slate-50"
      } ${isSelected ? "ring-2 ring-slate-300 ring-offset-2 ring-offset-white" : ""} ${isCorrect ? "border-amber-400 bg-amber-50" : ""}`}
      whileHover={disabled ? undefined : { y: -10, scale: 1.025 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      animate={isCorrect ? { y: [0, -8, 0] } : { y: 0 }}
      transition={{ duration: 0.34, ease: "easeOut" }}
    >
      <div className="relative h-full w-full p-1 sm:p-2">
        <AnimatePresence mode="wait">
          {hasImageError ? (
            <motion.div
              key="fallback"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="h-full w-full"
            >
              <FallbackHandArt side={side} handState={handState} isCorrect={isCorrect} />
            </motion.div>
          ) : (
            <motion.img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.25 }}
              onError={() => setHasImageError(true)}
              draggable="false"
            />
          )}
        </AnimatePresence>
      </div>

      <span className="absolute bottom-3 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] text-slate-950 shadow-sm sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm md:text-base">
        {label}
      </span>
    </motion.button>
  );
}
