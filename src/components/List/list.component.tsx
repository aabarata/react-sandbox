import { useEffect, useState } from "react";
import { Todo } from "../../@types/todo";

const List = () => {
  const [list, setList] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/todos?limit=10");
      const data = await response.json();
      setList(data.todos);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {list.map((item) => (
          <li>{item.todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
