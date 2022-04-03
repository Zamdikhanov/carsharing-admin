import css from "./Header.module.scss";
import avatar from "../../assets/header/user-avatar.jpg";
import { ReactComponent as Dropdown } from "./../../assets/header/dropdown-icon.svg";
import { ReactComponent as Notifications } from "./../../assets/header/notifications.svg";

function Header() {
  return (
    <header className={css.header}>
      <input className={css.search} placeholder="Поиск …" />
      <div className={css.notifications}>
        <Notifications className={css.notifications__svg} />
        <div className={css.notifications__count}>2</div>
      </div>
      <div className={css.user_details}>
        <img className={css.user_details__image} src={avatar} alt="avatar" />
        <div className={css.user_details__name}>Admin</div>
        <button className={css.user_details__dropdown}>
          <Dropdown className={css.user_details__dropdown_svg} />
        </button>
      </div>
    </header>
  );
}

export default Header;
