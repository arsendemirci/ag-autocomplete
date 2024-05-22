import styles from "./Autocomplete.module.scss";
import List from "../List/List";
import { useEffect, useRef, useState, FocusEvent, MouseEvent } from "react";
const options: string[] = [
  "Ross",
  "Chandler",
  "Rachel",
  "Monica",
  "Joey",
  "Phoebe",
  "Danny",
  "Richard",
  "David",
  "Laura",
  "Regina",
  "Ken",
  "Will",
  "Howard",
  "Carol",
  "Sussane",
  "Chip",
  "Zellner",
  "Kenny",
  "Tag",
  "Jack",
];
function Autocomplete() {
  const [showList, setShowList] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleListOpen = (event: MouseEvent): void => {
    console.log("adslfkja;dlfjk");
    event.stopPropagation();
    setShowList((prev) => !prev);
  };
  const hideList = (event: FocusEvent<HTMLInputElement>): void => {
    console.log("focus triggered", event.relatedTarget);
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

  useEffect(() => {
    //when the list is showing focus on input
    if (showList && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showList]);
  return (
    <div className={styles.MainWrapper}>
      <div id="divInput" className={styles.InputWrapper}>
        <input
          type="text"
          ref={inputRef}
          onClick={toggleListOpen}
          onBlur={hideList}
        ></input>
        <div className={styles.InputButtonWrapper}>
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
      <List open={showList} options={options}></List>
    </div>
  );
}

export default Autocomplete;
