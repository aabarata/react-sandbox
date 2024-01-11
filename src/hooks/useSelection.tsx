import { useState } from "react";

function useSelection<T>(initialSelection: T[] = []) {
  const [selection, setSelection] = useState<T[]>(initialSelection);

  const onSelectionHandler = (item: T): void => {
    if (selection.includes(item)) {
      setSelection(selection.filter((i) => i !== item));
    } else {
      setSelection([...selection, item]);
    }
  };

  return { selection, onSelectionHandler };
}

export default useSelection;
