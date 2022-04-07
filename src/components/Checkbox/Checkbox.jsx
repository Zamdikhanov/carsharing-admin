import css from './Checkbox.module.scss';

function Checkbox({ label, checked }) {
    return (
        <label className={`${css.checkbox}`} htmlFor={label} key={label}>
            <input
                className={css.checkbox__input}
                type="checkbox"
                name={label}
                id={label}
                checked={checked}
                onChange={() => console.log('press checkbox')}
            />
            <div className={css.checkbox__label}>{label}</div>
        </label>
    );
}

export default Checkbox;
