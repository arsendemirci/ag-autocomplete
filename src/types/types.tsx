export interface ChipProps {
  item: ChipItem;
  focusId: string;
  onRemove: (item: ChipItem) => void;
}

export interface CharacterItem {
  id: number;
  text: string;
  image: string;
  episodes: number;
}
export interface ListProps {
  options: CharacterItem[];
  open: boolean;
  isLoading:boolean;
  search: string;
  selectedIds: number[];
  onListItemSelect: (selectedItem: ChipItem) => void;
}

export interface ListItemProps {
  item: CharacterItem;
  focusId: string;
  selected: boolean;
  search: string;
  onSelect: (selectedItem: ChipItem) => void;
}

export interface ChipItem {
  id: number;
  text: string;
}

export interface ListItem {
  id: number;
  image: string;
  text: string;
}
