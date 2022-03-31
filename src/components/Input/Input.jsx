import css from './Input.module.scss';

function Input({ label, placeholder, type, errors, register, required }) {
    return (
        <div className={css.input_container}>
            <label>
                <div className={css.label}>{label}</div>
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register(label, { required })}
                />
            </label>
            {errors && errors[label]?.type === 'required' && (
                <div className={css.error}>Поле обязательно к заполнению</div>
            )}
            {errors && errors[label]?.message && (
                <div className={css.error}>{errors[label].message}</div>
            )}
        </div>
    );
}

export default Input;
