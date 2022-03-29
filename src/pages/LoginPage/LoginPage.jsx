import css from "./LoginPage.module.scss";
import { ReactComponent as Logo } from '../../assets/logo.svg';

function LoginPage() {
  return (
    <div className={css.container}>
      <div className={css.block}>
        <header className={css.block_header}>
          <Logo />
          <h2 className={css.block_header__title}>Need for drive</h2>
        </header>
        <main className={css.card}>
          <h3 className={css.card_header}>Вход</h3>
          <div className={css.input_container}>
            <label>Почта</label>
            <input type="email" placeholder="admin@ss.com" />
            <div>error</div>
          </div>
          <div className={css.input_container}>
            <label>Пароль</label>
            <input type="password" placeholder="пароль*" />
            <div>error</div>
          </div>
          <div className={css.card_footer}>
            <button className={css.button}>Запросить доступ</button>
            <button className={css.standart_button}>Войти</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LoginPage;
