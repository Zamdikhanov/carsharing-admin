import css from "./Header.module.scss";
function Header() {
  return (
    <header className={css.header}>
      <input className={css.search} />
      <div className={css.notifications}>mes</div>
      <div className={css.user_details}>login</div>
    </header>
  );
}

export default Header;
