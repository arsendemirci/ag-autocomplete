import { useRef, MouseEvent } from "react";
import styles from "./ListItem.module.scss";
import { ListItemProps } from "../../types/types";

function ListItem({
  item,
  focusId,
  selected,
  search,
  onSelect,
}: ListItemProps) {
  const chkRef = useRef<HTMLInputElement>(null);
  const onListItemClick = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    chkRef.current?.click();
  };
  const clWrap: string = `${styles.MainWrapper} ${selected && styles.selected}`;
  //splitting the result to highlight search term
  const parts: string[] = item.text.split(new RegExp(`(${search})`, "gi"));

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
      <div>
        <label>
          {parts.map((part) =>
            part.toLowerCase() === search.toLowerCase() ? <b>{part}</b> : part
          )}
        </label>
        <label className={styles.Episodes}>{item.episodes > 0 && `${item.episodes} Episodes`}</label>
      </div>
    </li>
  );
}

export default ListItem;
