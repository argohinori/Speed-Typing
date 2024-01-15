import GeneratedWords from "./components/GeneratedWords";
import Result from "./components/Result";
import RestartButton from "./components/RestartButton";
import UserTyping from "./components/UserTyping";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage, calculateWPM } from "./utils/helpers";

function App() {
  const {
    state,
    words,
    timeLeft,
    typed,
    errors,
    restart,
    totalTyped,
    totalWord,
  } = useEngine();
  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords words={words} />
        <UserTyping
          className="absolute inset-0"
          userInput={typed}
          words={words}
        />
      </WordsContainer>
      <RestartButton
        onRestart={restart}
        className="mx-auto mt-10 text-slate-500"
      />
      <Result
        state={state}
        className="mt-10"
        wpm={calculateWPM(totalWord)}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </>
  );
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>;
};

export default App;
