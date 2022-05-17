import css from './Checkbox.module.scss';

function Checkbox({
    id,
    label,
    checked = false,
    disabled = true,
    onChange = () => {},
}) {
    return (
        <label className={css.checkbox} htmlFor={id + label}>
            <input
                className={css.checkbox__input}
                type="checkbox"
                name={label}
                id={id + label}
                disabled={disabled}
                defaultChecked={checked}
                onChange={() => {
                    onChange();
                }}
            />
            <div className={css.checkbox__label}>{label}</div>
        </label>
    );
}

export default Checkbox;
