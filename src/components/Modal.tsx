import styles from "./modal.module.scss";
interface ModalProps {
  type: "Won" | "Lost";
  completedWords: string[];
  solution: string;
}

interface SquareProps {
  word: string;
  solution: string;
}

export default function Modal({ type, completedWords, solution }: ModalProps) {
  function Square({ word, solution }: SquareProps) {
    function checkeLetter(letter: string, pos: number): string {
      if (solution.includes(letter)) {
        if (solution[pos] === letter) {
          return "🟩";
        } else {
          return "🟨";
        }
      } else {
        return "⬛";
      }
    }
    return (
      <div className={styles.puzzleWord}>
        {word.split("").map((letter, i) => (
          <div>{checkeLetter(letter, i)}</div>
        ))}
      </div>
    );
  }
  return (
    <div className={styles.modalViewContainer}>
      <div className={styles.modalContainer}>
        <h2>You {type === "Won" ? "won !!" : "lost"}</h2>

        <div className={styles.puzzle}>
          {completedWords.map((word, i) => (
            //cuadrito
            <div>
              <Square key={i} word={word} solution={solution} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
