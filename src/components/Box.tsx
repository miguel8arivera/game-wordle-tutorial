import { BoxStatus } from "./Types";

import styles from "./box.module.scss";
import classNames from "classnames/bind";

const classes = classNames.bind(styles);

interface BoxProps {
  value: string;
  status: BoxStatus;
}

export default function Box({ value, status }: BoxProps) {
  const boxStatus = classes({
    correct: status === "correct",
    absent: status === "absent",
    edit: status === "edit",
    empty: status === "empty",
    present: status === "present",
  });

  return <div className={boxStatus}>{value}</div>;
}
