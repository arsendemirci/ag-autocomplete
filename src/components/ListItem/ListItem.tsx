import { useRef, MouseEvent } from "react";
import styles from "./ListItem.module.scss";
import { ListItemProps } from "../../types/types";

function ListItem({ item, focusId, selected, onSelect }: ListItemProps) {
  const chkRef = useRef<HTMLInputElement>(null);
  const onListItemClick = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    chkRef.current?.click();
  };
  const clWrap: string = `${styles.MainWrapper} ${selected && styles.selected}`;
  return (
    <li
      onClick={onListItemClick}
      data-focus={focusId}
      tabIndex={0}
      className={clWrap}
    >
      <input
        onClick={(event: React.MouseEvent<HTMLInputElement>) =>
          event.stopPropagation()
        }
        ref={chkRef}
        data-focus={focusId}
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(item)}
      />
      <img src={item.image} alt="new" />
      <label>{item.text}</label>
    </li>
  );
}

export default ListItem;
