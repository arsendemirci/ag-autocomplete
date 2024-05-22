import styles from "./Autocomplete.module.scss";
import List from "../List/List";
import Chip from "../Chip/Chip";
import { ChipItem, ListItem } from "../../types/types";
import { useEffect, useRef, useState, FocusEvent, MouseEvent } from "react";

let TransformAToB = (input: ListItem): ChipItem => {
  return {
    id: input.id,
    text: input.text,
  };
};

const options: ListItem[] = [
  { id: 1, image: "https://picsum.photos/55/55", text: "Ross" },
  { id: 2, image: "https://picsum.photos/55/55", text: "Chandler" },
  { id: 3, image: "https://picsum.photos/55/55", text: "Rachel" },
  { id: 4, image: "https://picsum.photos/55/55", text: "Monica" },
  { id: 5, image: "https://picsum.photos/55/55", text: "Joey" },
  { id: 6, image: "https://picsum.photos/55/55", text: "Phoebe" },
  { id: 7, image: "https://picsum.photos/55/55", text: "Danny" },
  { id: 8, image: "https://picsum.photos/55/55", text: "Richard" },
  { id: 9, image: "https://picsum.photos/55/55", text: "David" },
  { id: 10, image: "https://picsum.photos/55/55", text: "Laura" },
  { id: 11, image: "https://picsum.photos/55/55", text: "Regina" },
  { id: 12, image: "https://picsum.photos/55/55", text: "Ken" },
  { id: 13, image: "https://picsum.photos/55/55", text: "Will" },
  { id: 14, image: "https://picsum.photos/55/55", text: "Howard" },
  { id: 15, image: "https://picsum.photos/55/55", text: "Carol" },
  { id: 16, image: "https://picsum.photos/55/55", text: "Sussane" },
  { id: 17, image: "https://picsum.photos/55/55", text: "Chip" },
  { id: 18, image: "https://picsum.photos/55/55", text: "Zellner" },
  { id: 19, image: "https://picsum.photos/55/55", text: "Kenny" },
  { id: 20, image: "https://picsum.photos/55/55", text: "Tag" },
  { id: 21, image: "https://picsum.photos/55/55", text: "Jack" },
];

function Autocomplete() {
  const [showList, setShowList] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<ChipItem[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleListOpen = (event: MouseEvent): void => {
    event.stopPropagation();
    setShowList((prev) => !prev);
  };
  const hideList = (event: FocusEvent<HTMLInputElement>): void => {
    if (
      event.relatedTarget &&
      event.relatedTarget.getAttribute("data-focus") === "autocomplete"
    ) {
      inputRef.current?.focus();
      return;
    } else {
      setShowList(false);
    }
  };

  const onListItemSelect = (item: ChipItem) => {
    let find: ChipItem | undefined = selectedItems.find(
      (i) => i.id === item.id
    );
    if (find) {
      setSelectedItems([...selectedItems.filter((ite) => ite.id !== find?.id)]);
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const onChipRemove = (item: ChipItem): void => {
    let find: ChipItem | undefined = selectedItems.find(
      (i) => i.id === item.id
    );
    if (find) {
      setSelectedItems([...selectedItems.filter((ite) => ite.id !== find?.id)]);
    }
  };
  useEffect(() => {
    //when the list is showing focus on input
    if (showList && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showList]);
  return (
    <div
      tabIndex={0}
      data-focus="autocomplete"
      onClick={toggleListOpen}
      className={styles.MainWrapper}
    >
      <div className={styles.InputWrapper}>
        {selectedItems.map((item) => (
          <Chip
            onRemove={onChipRemove}
            key={item.id}
            item={item}
            focusId="autocomplete"
          />
        ))}

        <input
          type="text"
          ref={inputRef}
          onClick={toggleListOpen}
          onBlur={hideList}
        ></input>
        <div className={`${styles.InputButtonWrapper} ${showList && styles.ListOpen}` }>
          <button data-focus="autocomplete" onClick={toggleListOpen}>
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="16px"
              width="16px"
            >
              <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" />
            </svg>
          </button>
        </div>
      </div>
      <List
        onListItemSelect={onListItemSelect}
        open={showList}
        options={options}
        selectedIds={selectedItems.map((item) => item.id)}
      ></List>
    </div>
  );
}

export default Autocomplete;
