import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import sideData from "../../data/sidebar.json";
import utils from "../../utils/localstorage";
import BrandLogo from "../brand";
import styles from "./sidebar.module.scss";

function Sidebar({ onAddNote }) {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.path === "/notes") {
      onAddNote();
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
     
    utils.removeFromLocalStorage("auth_key");
    navigate("/");
  };

  return (
    <aside className={styles.sidebar}>
      <BrandLogo logoOnly={true} className={styles.logo} type={"dark"} />
      <section>
        {sideData.map((item, index) => (
          <article
            key={index}
            className={styles.item}
            onClick={() => handleClick(item)}
          >
            <Icon
              icon={item.icon}
              height={"35px"}
              color={index === 1 ? "var(--light-grey)" : "var(--white)"}
            />
          </article>
        ))}
      </section>
      <article className={styles.logoutbtn}>
        <Icon icon={"material-symbols:logout"} onClick={handleLogout} />
      </article>
    </aside>
  );
}

export default Sidebar;