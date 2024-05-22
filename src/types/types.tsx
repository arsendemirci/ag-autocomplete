export interface ChipProps {
  item: ChipItem;
  focusId: string;
  onRemove: (item: ChipItem) => void;
}

export interface ListProps {
  options: ListItem[];
  open: boolean;
  selectedIds: number[];
  onListItemSelect: (selectedItem: ChipItem) => void;
}

export interface ListItemProps {
  item: ListItem;
  focusId: string;
  selected: boolean;
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
