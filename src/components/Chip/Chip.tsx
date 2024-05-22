import styles from "./Chip.module.scss";
import { ChipProps } from "../../types/types";
import { MouseEvent } from "react";

function Chip({ item, focusId, onRemove }: ChipProps) {
  const onRemoveClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    onRemove(item);
  };
  return (
    <div tabIndex={0} data-focus={focusId} className={styles.Container}>
      <span>{item.text}</span>
      <button onClick={onRemoveClick} data-focus={focusId}>
        <svg viewBox="0 0 24 24" fill="currentColor" height="24px" width="24px">
          <path d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 000 1.42 1 1 0 001.42 0l4.29-4.3 4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42z" />
        </svg>
      </button>
    </div>
  );
}

export default Chip;
