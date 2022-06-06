import Box from "./Box";
import { BoxStatus } from "./Types";
import styles from "./row.module.scss";

interface RowCompletedProps {
  word: string;
  solution: string;
}

export default function RowCompleted({ word, solution }: RowCompletedProps) {
  function checkLetter(letter: string, pos: number): BoxStatus {
    if (solution.includes(letter)) {
      if (solution[pos] === letter) {
        return "correct";
      } else {
        return "present";
      }
    } else {
      return "absent";
    }
  }
  return (
    <div className={styles.row}>
      {Array.from(Array(5)).map((_, i) => (
        <Box key={i} value={word[i]} status={checkLetter(word[i], i)} />
      ))}
    </div>
  );
}
