import ListItem from "../ListItem/ListItem";
import styles from "./List.module.scss";

type ListProps = {
  options: string[];
  open: boolean;
};

function List({ options, open }: ListProps) {
  const lWrap: string = `${styles.ListWrapper} ${open && styles.open}`;
  return (
    <div tabIndex={0} data-focus="autocomplete" className={lWrap}>
      <ul>
        {options.map((item, index) => (
          <ListItem key={index} focusId="autocomplete" item={item} />
        ))}
      </ul>
    </div>
  );
}

export default List;
