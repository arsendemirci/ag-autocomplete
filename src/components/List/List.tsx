import ListItem from "../ListItem/ListItem";
import styles from "./List.module.scss";
import { ListProps } from "../../types/types";

function List({ options, open, selectedIds, onListItemSelect }: ListProps) {
  const lWrap: string = `${styles.ListWrapper} ${open && styles.open}`;
  return (
    <div tabIndex={0} data-focus="autocomplete" className={lWrap}>
      <ul>
        {options.map((item, index) => (
          <ListItem
            onSelect={onListItemSelect}
            key={index}
            focusId="autocomplete"
            item={item}
            selected={selectedIds.includes(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default List;
