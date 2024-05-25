import ListItem from "../ListItem/ListItem";
import styles from "./List.module.scss";
import { ListProps } from "../../types/types";
import { useRef, useEffect, useState } from "react";

function List({
  options,
  open,
  selectedIds,
  search,
  isLoading,
  onListItemSelect,
}: ListProps) {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const lWrap: string = `${styles.ListWrapper} ${open && styles.open}`;

  useEffect(() => {
    if (!ulRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (ulRef?.current?.scrollHeight && ulRef?.current?.scrollHeight >= 400) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
      // Do what you want to do when the size of the element changes
    });
    resizeObserver.observe(ulRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);
  return (
    <div tabIndex={0} data-focus="autocomplete" className={lWrap}>
      <ul ref={ulRef} className={`${isOverflow && styles.scrolling}`}>
        {!isLoading && !options.length && (
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
