import css from './TripleButton.module.scss';

function TripleButton() {
    return (
        <div className={css.container}>
            <button className={css.button} type="button">
                Готово
            </button>
            <button className={css.button} type="button">
                Отмена
            </button>
            <button className={css.button} type="button">
                Изменить
            </button>
        </div>
    );
}

export default TripleButton;
