import { useRef } from "react";
import styles from "./ListItem.module.scss";
type ListItemProps = {
  item: string;
  focusId: string;
};
function ListItem({ item, focusId }: ListItemProps) {
  const chkRef = useRef<HTMLInputElement>(null);
  return (
    <li
      onClick={() => chkRef.current?.click()}
      data-focus={focusId}
      tabIndex={0}
      className={styles.MainWrapper}
    >
      <input
        onClick={(event: React.MouseEvent<HTMLInputElement>) =>
          event.stopPropagation()
        }
        ref={chkRef}
        data-focus={focusId}
        type="checkbox"
      />
      {item}
    </li>
  );
}

export default ListItem;
