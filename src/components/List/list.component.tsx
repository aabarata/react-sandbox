import { useEffect, useState } from "react";
import { Todo } from "../../@types/todo.d";
import { FixedSizeList as VirtualizedList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import styles from "./list.module.scss";

const DEFAULT_NUMBER_OF_ITEMS = 100;

const Item = ({
  data,
  index,
  style,
}: {
  data: Todo[];
  index: number;
  style: any;
}) => {
  return <li style={style}>{data[index].todo}</li>;
};

const List = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async () => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/todos?limit=${DEFAULT_NUMBER_OF_ITEMS}&skip=${
          page * DEFAULT_NUMBER_OF_ITEMS
        }`
      );
      const data = await response.json();
      setList([...list, ...data.todos]);
      if (data.limit) {
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }
  };

  const isItemLoaded = (index: number) => {
    return index !== list.length - 1;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={list.length}
      loadMoreItems={fetchData}
    >
      {({ onItemsRendered, ref }) => (
        <VirtualizedList
          className={styles.list}
          height={300}
          itemCount={list.length}
          itemSize={20}
          itemData={list}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width="100%"
        >
          {Item}
        </VirtualizedList>
      )}
    </InfiniteLoader>
  );
};

export default List;
