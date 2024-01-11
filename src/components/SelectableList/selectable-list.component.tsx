import { Product } from "../../@types/product.d";
import { User } from "../../@types/user.d";

type SelectableListProps<T> = {
  items: T[];
  onSelection: (item: T) => void;
};

const SelectableList = <T extends User | Product>(
  props: SelectableListProps<T>
) => {
  const { items, onSelection } = props;
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <input type="checkbox" onChange={() => onSelection(item)} />
          {"title" in item ? item.title : item.firstName}
        </li>
      ))}
    </ul>
  );
};

export default SelectableList;
