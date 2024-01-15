import classNames from "classnames";
import Caret from "./Caret";

const UserTyping = ({
  userInput,
  className,
  words,
}: {
  userInput: string;
  className?: string;
  words: string;
}) => {
  const typedCharacters = userInput.split("");
  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return (
          <Character
            key={`${char}_${index}`}
            actual={char}
            expected={words[index]}
          />
        );
      })}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={classNames({
        "text-primary-400": isCorrect && !isWhiteSpace,
        "text-white": !isCorrect && !isWhiteSpace,
        "bg-red-500/85":
          (!isCorrect && !isWhiteSpace) || (!isCorrect && isWhiteSpace),
      })}
    >
      {expected}
    </span>
  );
};

export default UserTyping;
