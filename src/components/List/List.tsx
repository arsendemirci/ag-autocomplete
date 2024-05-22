import ListItem from "../ListItem/ListItem";
import styles from "./List.module.scss";
import { ListProps } from "../../types/types";

function List({
  options,
  open,
  selectedIds,
  search,
  onListItemSelect,
}: ListProps) {
  const lWrap: string = `${styles.ListWrapper} ${open && styles.open}`;

  return (
    <div tabIndex={0} data-focus="autocomplete" className={lWrap}>
      <ul>
        {!options.length && (
          <li key="norecord" className={styles.NoRecord}>
            There is no character matching your search!!
          </li>
        )}
        {options
          .filter((item) =>
            item.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <ListItem
              onSelect={onListItemSelect}
              search={search}
              key={item.id}
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
