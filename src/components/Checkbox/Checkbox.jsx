import css from './Checkbox.module.scss';

function Checkbox({ id, label, checked = false, onChange = () => {} }) {
    return (
        <label className={css.checkbox} htmlFor={id + label}>
            <input
                className={css.checkbox__input}
                type="checkbox"
                name={label}
                id={id + label}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <div className={css.checkbox__label}>{label}</div>
        </label>
    );
}

export default Checkbox;
