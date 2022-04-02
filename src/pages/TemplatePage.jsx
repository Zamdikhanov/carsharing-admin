import { NavLink } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import css from "./TemplatePage.module.scss";

function TemplatePage() {
  return (
    <div className={css.bg}>
      <div className={css.wrapper}>
        <div className={css.page}>
          <nav className={css.nav}>
            <SideBar />
          </nav>
          <div className={css.main_container}>
            <header className={css.header}>header</header>
            <main className={css.main}>main</main>
            <footer className={css.footer}>
              <ul className={css.link_list}>
                <li className={css.link_list__item}>
                  <NavLink className={css.link} to={"/"}>
                    Главная страница
                  </NavLink>
                </li>
                <li className={css.link_list__item}>
                  <NavLink className={css.link} to={"/"}>
                    Ссылка
                  </NavLink>
                </li>
              </ul>
              <div className={css.copy}>Copyright © 2022 Simbirsoft</div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplatePage;
