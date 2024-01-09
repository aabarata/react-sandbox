import { ReactNode } from "react";
import styles from "./loader.module.scss";

const Loader = ({ children }: { children?: ReactNode }) => {
  return <div className={styles.loader}>{children}</div>;
};

function Content({ children }: { children: ReactNode | string }) {
  return <span className={styles.content}>{children}</span>;
}

Loader.Content = Content;

export default Loader;
