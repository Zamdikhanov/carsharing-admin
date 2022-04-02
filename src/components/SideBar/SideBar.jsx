import { NavLink } from "react-router-dom";
import css from "./SideBar.module.scss";

function SideBar() {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h3 className={css.header__title}>Need for car</h3>
      </div>
      <ul className={css.menu_list}>
        <li className={css.menu_list__item}>
          <NavLink className={css.link} to="/">
            Карточка автомобиля
          </NavLink>
        </li>
        <li className={css.menu_list__item}>
          <NavLink className={css.link} to="/">
            Список авто
          </NavLink>
        </li>
        <li className={css.menu_list__item}>
          <NavLink className={css.link} to="/">
            Заказы
          </NavLink>
        </li>
        <li className={css.menu_list__item}>
          <NavLink className={css.link} to="/">
            Меню
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
