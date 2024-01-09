import { Suspense, lazy } from "react";
import Loader from "./components/Loader/loader.component";
import styles from "./App.module.scss";

const List = lazy(() => import("./components/List/list.component"));

function App() {
  return (
    <div className={styles.app}>
      <div>
        <Suspense fallback={<Loader />}>
          <h2>TODO List</h2>
          <List />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
