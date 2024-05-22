import styles from "./ListItem.module.scss";
type ListItemProps = {
  item: string;
  focusId: string;
};
function ListItem({ item, focusId }: ListItemProps) {
  return (
    <div data-focus={focusId} tabIndex={0} className={styles.MainWrapper}>
      <input data-focus={focusId} type="checkbox" />
      {item}
    </div>
  );
}

export default ListItem;
