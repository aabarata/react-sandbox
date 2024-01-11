import { Suspense, lazy, useEffect, useState } from "react";
import { User } from "./@types/user.d";
import { Product } from "./@types/product.d";
import Loader from "./components/Loader/loader.component";
import styles from "./App.module.scss";
import SelectableList from "./components/SelectableList/selectable-list.component";
import useSelection from "./hooks/useSelection";

const List = lazy(() => import("./components/List/list.component"));

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const {
    selection: selectedUsers,
    onSelectionHandler: onUserSelectionHandler,
  } = useSelection<string>([]);
  const {
    selection: selectedProducts,
    onSelectionHandler: onProductSelectionHandler,
  } = useSelection<string>([]);

  const fetchUsers = async () => {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    setUsers(data.users);
  };

  const fetchProduct = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchUsers();
    fetchProduct();
  }, []);

  return (
    <div className={styles.app}>
      <div>
        <Suspense fallback={<Loader />}>
          <h2>TODO List</h2>
          <List />
        </Suspense>
      </div>
      <div>
        <h2>Users</h2>
        <SelectableList
          items={users}
          onSelection={(user) => onUserSelectionHandler(user.firstName)}
        />
        {selectedUsers.length}
      </div>
      <div>
        <h2>Products</h2>
        <SelectableList
          items={products}
          onSelection={(product) => onProductSelectionHandler(product.title)}
        />
        {selectedProducts.length}
      </div>
    </div>
  );
}

export default App;
