import css from './Input.module.scss';

function Input({ label, placeholder, type, errors, register, ...rest }) {
    return (
        <div className={css.input_container}>
            <label>
                <div className={css.label}>{label}</div>
                <input
                    className={`${css.input} ${
                        errors && errors[label] && css.input_error
                    }`}
                    type={type}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...register(label, { ...rest })}
                />
            </label>
            {errors && errors[label]?.message && (
                <div className={css.error}>{errors[label].message}</div>
            )}
            {errors && errors[label]?.type === 'required' && (
                <div className={css.error}>Обязательное поле</div>
            )}
        </div>
    );
}

export default Input;
