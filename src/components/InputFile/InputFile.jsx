import css from './InputFile.module.scss';

function InputFile({
    label,
    buttonText,
    placeholder,
    errors,
    register,
    onChange,
    ...rest
}) {
    const classNameLabel = `${css.label} ${errors && errors[label] && css.label_error
        }`;

    return (
        <div className={css.input_container}>
            <label className={classNameLabel}>
                <div className={css.placeholder}>{placeholder}</div>
                <div className={css.button_text}>{buttonText}</div>
                <input
                    className={css.input}
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    placeholder={placeholder}
                    autoComplete="off"
                    {...register(label, { ...rest })}
                    onChange={onChange}
                />
            </label>
            {errors && errors[label]?.message && (
                <div className={css.error}>{errors[label].message}</div>
            )}
            {errors && errors[label]?.type === 'required' && (
                <div className={css.error}>Выберите файл изображения</div>
            )}
        </div>
    );
}

export default InputFile;
