import css from './TextArea.module.scss';

function TextArea({ label, placeholder, type, errors, register, ...rest }) {
    const classNameTextArea = `${css.textarea} ${
        errors && errors[label] && css.textarea_error
    }`;

    return (
        <div className={css.textarea_container}>
            <label>
                <div className={css.label}>{label}</div>
                <textarea
                    className={classNameTextArea}
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

export default TextArea;
