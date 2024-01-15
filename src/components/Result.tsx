import { motion } from "framer-motion";
import { formatPercentage } from "../utils/helpers";
import { State } from "../hooks/useEngine";

const Result = ({
  state,
  wpm,
  errors,
  accuracyPercentage,
  total,
  className,
}: {
  state: State;
  wpm: number;
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
}) => {
  const inital = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  if (state !== "finish") {
    return null;
  }

  return (
    <ul
      className={`flex flex-col items-center text-primary-600 space-y-3 ${className}`}
    >
      <motion.li
        initial={inital}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className="text-xl text-primary-500/60 font-semibold"
      >
        Result
      </motion.li>
      <motion.li
        initial={inital}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className="text-4xl bold"
      >
        {wpm} WPM
      </motion.li>
      <motion.li
        initial={inital}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={inital}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="text-red-600"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={inital}
        animate={animate}
        transition={{ ...duration, delay: 1.5 }}
      >
        Typed: {total}
      </motion.li>
    </ul>
  );
};

export default Result;
