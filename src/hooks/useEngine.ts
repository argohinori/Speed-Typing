import { useCallback, useEffect, useState } from "react";
import { countErrors } from "../utils/helpers";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import useTyping from "./useTyping";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdownTimer(COUNTDOWN_SECONDS);
  const {
    typed,
    cursor,
    clearTyped,
    resetTotalTyped,
    totalTyped,
    resetTotalWord,
    totalWord,
  } = useTyping(state !== "finish");

  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  // as soon the user starts typing the first letter, we start
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // when the time is up, we're finished
  useEffect(() => {
    if (!timeLeft) {
      console.log("time is up...");
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  // when the currents words are all filled up,
  // we generate show a new set of words
  useEffect(() => {
    if (areWordsFinished) {
      console.log("words are finished...");
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [
    cursor,
    words,
    clearTyped,
    typed,
    areWordsFinished,
    updateWords,
    sumErrors,
  ]);

  const restart = useCallback(() => {
    console.log("restarting...");
    resetCountdown();
    resetTotalTyped();
    resetTotalWord();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [
    clearTyped,
    updateWords,
    resetCountdown,
    resetTotalTyped,
    resetTotalWord,
  ]);

  return {
    state,
    words,
    timeLeft,
    typed,
    errors,
    totalTyped,
    totalWord,
    restart,
  };
};

export default useEngine;
