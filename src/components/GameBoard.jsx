import { useCallback, useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDollarSign, RotateCcw } from "lucide-react";
import Hand from "./Hand.jsx";

const HANDS = ["left", "right"];

function randomHand() {
  return HANDS[Math.floor(Math.random() * HANDS.length)];
}

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export default function GameBoard() {
  const [coinHand, setCoinHand] = useState(() => randomHand());
  const [selectedHand, setSelectedHand] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const { width, height } = useWindowSize();

  const isComplete = gameResult !== null;
  const resultText = gameResult === "win" ? "You Won!" : "You Lost!";
  const resultTone = gameResult === "win" ? "text-emerald-700" : "text-rose-700";
  const getHandState = useCallback(
    (hand) => {
      if (!isRevealed) return "fist";
      return coinHand === hand ? "open-coin" : "open-empty";
    },
    [coinHand, isRevealed],
  );

  const chooseHand = useCallback(
    (hand) => {
      if (isComplete || selectedHand) return;

      setSelectedHand(hand);
      setIsRevealed(true);
      setGameResult(hand === coinHand ? "win" : "loss");
    },
    [coinHand, isComplete, selectedHand],
  );

  const playAgain = useCallback(() => {
    setSelectedHand(null);
    setIsRevealed(false);
    setGameResult(null);
    setCoinHand(randomHand());
  }, []);

  const status = useMemo(() => {
    if (!selectedHand) return "Pick a hand";
    return gameResult === "win" ? "The coin was there" : `The coin was in the ${coinHand} hand`;
  }, [coinHand, gameResult, selectedHand]);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-100 text-slate-950">
      <div className="fixed inset-0 bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_48%,#dbeafe_100%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(245,158,11,0.13),transparent_24%)]" />

      {gameResult === "win" && width > 0 ? (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={420} gravity={0.18} tweenDuration={7000} />
      ) : null}

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <motion.header
            className="mx-auto mb-6 max-w-3xl text-center sm:mb-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/75 px-4 py-2 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-md">
              <CircleDollarSign className="h-4 w-4 text-amber-600" aria-hidden="true" />
              Coin hidden. Hands closed.
            </div>
            <h1 className="text-balance text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
              Guess Which Hand Has the Coin
            </h1>
          </motion.header>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white/82 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-2xl sm:p-6 lg:p-8">
            <div className="mb-4 flex min-h-20 flex-col items-center justify-center gap-3 text-center sm:mb-6">
              <AnimatePresence mode="wait">
                {gameResult ? (
                  <motion.div
                    key={gameResult}
                    initial={{ opacity: 0, y: 16, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.34 }}
                    className="space-y-2"
                    role="status"
                    aria-live="polite"
                  >
                    <motion.p
                      className={`text-4xl font-black leading-none sm:text-6xl ${resultTone}`}
                      animate={gameResult === "win" ? { scale: [1, 1.08, 1] } : { x: [0, -5, 5, -3, 3, 0] }}
                      transition={{ duration: 0.55 }}
                    >
                      {resultText}
                    </motion.p>
                    <p className="text-base font-semibold text-slate-800 sm:text-lg">{status}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-2"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="text-2xl font-black text-slate-950 sm:text-3xl">{status}</p>
                    <p className="text-sm font-medium text-slate-700 sm:text-base">Choose left or right. Both hands will open together.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mx-auto grid w-full max-w-4xl grid-cols-2 justify-items-center gap-x-4 sm:gap-x-6 lg:gap-x-8">
              {HANDS.map((hand) => (
                <Hand
                  key={hand}
                  side={hand}
                  handState={getHandState(hand)}
                  isSelected={selectedHand === hand}
                  isCorrect={isRevealed && coinHand === hand}
                  disabled={isComplete}
                  onChoose={chooseHand}
                />
              ))}
            </div>

            <AnimatePresence>
              {gameResult ? (
                <motion.div
                  className="mt-6 flex justify-center"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <motion.button
                    type="button"
                    onClick={playAgain}
                    className="inline-flex items-center gap-3 rounded-full border border-slate-900 bg-slate-950 px-7 py-4 text-base font-black text-white shadow-lg outline-none transition-colors hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-slate-400 sm:text-lg"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <RotateCcw className="h-5 w-5" aria-hidden="true" />
                    Play Again
                  </motion.button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
