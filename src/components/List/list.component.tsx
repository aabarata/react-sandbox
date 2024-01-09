import { useEffect, useRef, useState } from "react";
import { Todo } from "../../@types/todo";
import styles from "./list.module.scss";

const DEFAULT_NUMBER_OF_ITEMS = 100;

function Item({ item }: { item: Todo }) {
  return <li>{item.todo}</li>;
}

const List = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [page, setPage] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    const response = await fetch(
      `https://dummyjson.com/todos?limit=${DEFAULT_NUMBER_OF_ITEMS}&skip=${
        page * DEFAULT_NUMBER_OF_ITEMS
      }`
    );
    const data = await response.json();
    setList([...list, ...data.todos]);
  };

  const handleScroll = () => {
    const divRef = listRef.current;
    const clientHeight = divRef?.clientHeight || 0;
    const scrollHeight = divRef?.scrollHeight || 0;
    const scrollTop = divRef?.scrollTop || 0;
    if (scrollHeight - scrollTop <= clientHeight) {
      setPage(page + 1);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const divRef = listRef.current;
    divRef?.addEventListener("scroll", handleScroll);
    return () => divRef?.removeEventListener("scroll", handleScroll);
  });

  return (
    <div ref={listRef} className={styles.list}>
      <ul>
        {list.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default List;
