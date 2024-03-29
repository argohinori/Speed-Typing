import { useCallback, useEffect, useRef, useState } from "react";

const isKeyboardAllowed = (code: string) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
};

const useTyping = (enabled: boolean) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState<string>("");
  const totalTyped = useRef(0);
  const totalWord = useRef(0);

  const keywordHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyboardAllowed(code)) {
        return;
      }
      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setCursor(cursor - 1);
          totalTyped.current -= 1;
          break;
        default:
          if (code === "Space") {
            totalWord.current += 1;
          }
          setTyped((prev) => prev.concat(key));
          setCursor(cursor + 1);
          totalTyped.current += 1;
      }
    },
    [cursor, enabled]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  const resetTotalWord = useCallback(() => {
    totalWord.current = 0;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keywordHandler);

    return () => {
      window.removeEventListener("keydown", keywordHandler);
    };
  }, [keywordHandler]);

  return {
    typed,
    cursor,
    clearTyped,
    resetTotalTyped,
    totalTyped: totalTyped.current,
    resetTotalWord,
    totalWord: totalWord.current,
  };
};

export default useTyping;
