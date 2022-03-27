import css from "./LoginPage.module.scss";

function LoginPage() {
  return (
    <div className={css.container}>
      <div className={css.block}>
        <header className={css.block_header}>Need for drive</header>
        <main className={css.card}>
          <h3 className={css.card_header}>Вход</h3>
          <label className={css.input_label}>
            <span>Почта</span>
            <input type="text" placeholder="admin@ss.com" />
            <div>error</div>
          </label>
          <label className={css.input_label}>
            <span>Пароль</span>
            <input type="password" placeholder="пароль*" />
            <div>error</div>
          </label>
          <div>button</div>
        </main>
      </div>
    </div>
  );
}

export default LoginPage;
