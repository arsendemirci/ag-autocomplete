import styles from "./Autocomplete.module.scss";
import List from "../List/List";
import Chip from "../Chip/Chip";
import { ChipItem, CharacterItem } from "../../types/types";
import { useQuery } from "react-query";
import { useEffect, useRef, useState, FocusEvent, MouseEvent } from "react";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";

// const endpoint: string = "https://rickandmortyapi.com/graphql";

// const query: string = `
//   {characters(page:1,filter:{name:$searchVal}) {
//     results {
//       id, name,image,episode{id}
//     }
//   }}
// `;
function Autocomplete() {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [characters, setCharacters] = useState<CharacterItem[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<ChipItem[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, refetch } = useQuery(
    "launches",
    () => {
      return axios({
        url: "https://rickandmortyapi.com/graphql",
        method: "POST",
        data: {
          query: `
        {characters(page:1,filter:{name:"${searchVal}"}) {
          results {
            id, name,image,episode{id}
          }
        }}
      `,
        },
      }).then((response) => {
        console.log(response);
        return response.data.data.characters.results.map((item: any) => {
          let newItem: CharacterItem = {
            id: item.id,
            text: item.name,
            image: item.image,
            episodes: item.episode.length,
          };
          return newItem;
        });
      });
    },
  );
  // console.log("morty data", data);
  //if (isLoading) return <div>...Loading</div>;
  // setCharacters(data);
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
  const onChangeIput = (): void => {
    if (!showList) setShowList(true);
    // setSearchVal(event.target?.value);
    refetch();
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

  const debouncedOnChange = useDebounce(onChangeIput);
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
          onChange={(e) => {
            debouncedOnChange();
            setSearchVal(e.target.value);
          }}
          value={searchVal}
        ></input>
        {isLoading && (
          <div className={styles.Loader}>
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="24px"
              width="24px"
            >
              <path
                fill="currentColor"
                d="M8 0A8 8 0 00.002 7.812C.094 4.033 2.968 1 6.5 1 10.09 1 13 4.134 13 8a1.5 1.5 0 003 0 8 8 0 00-8-8zm0 16a8 8 0 007.998-7.812C15.906 11.967 13.032 15 9.5 15 5.91 15 3 11.866 3 8a1.5 1.5 0 00-3 0 8 8 0 008 8z"
              />
            </svg>
          </div>
        )}
        <div
          className={`${styles.InputButtonWrapper} ${
            showList && styles.ListOpen
          }`}
        >
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
        options={data || []}
        search={searchVal}
        selectedIds={selectedItems.map((item) => item.id)}
      ></List>
    </div>
  );
}

export default Autocomplete;
