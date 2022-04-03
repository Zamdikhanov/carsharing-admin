import { NavLink } from "react-router-dom";
import links from "./constants";
import css from "./SideBar.module.scss";

function SideBar() {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h3 className={css.header__title}>Need for car</h3>
      </div>
      <ul className={css.menu_list}>
        {links.map((linkItem) => (
          <li key={linkItem.id} className={css.menu_list__item}>
            <NavLink
              className={(navLink) =>
                `${css.link} ${navLink.isActive && css.link_active}`
              }
              to={linkItem.link}
            >
              <div className={css.link_icon}>{linkItem.icon}</div>
              <div className={css.link_text}>{linkItem.linkText}</div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
