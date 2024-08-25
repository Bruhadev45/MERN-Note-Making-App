import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Input from "../../components/atoms/input";
import styles from "./navbar.module.scss";

function Navbar({ onSearch, searchText }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className={styles.navbar}>
      <article className={styles.searchBar}>
        <Icon icon="material-symbols:search" />
        <Input
          value={searchText}
          onChange={handleSearchChange}
          placeholder={"Search Notes"}
          type={"text"}
          className={styles.field}
        />
      </article>
      <div className={styles.theme}>
        <Icon icon={"vaadin:sun-down"} />
      </div>
    </header>
  );
}

export default Navbar;