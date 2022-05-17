import Select, { components } from 'react-select';
import { ReactComponent as DropdownSvg } from '../../assets/icons/dropdown.svg';
import css from './SelectWithLabel.module.scss';

function DropdownIndicator(props) {
    return (
        <components.DropdownIndicator {...props}>
            <DropdownSvg />
        </components.DropdownIndicator>
    );
}

function SelectWithLabel(props) {
    const {
        label,
        name,
        placeholder,
        id,
        errors,
        options,
        type,
        field,
        onChange,
        noOptionsMessage,
        isLoading,
    } = props;

    const classNameSelect = `${css.input} ${
        errors && errors[name] && css.input_error
    }`;

    return (
        <div className={css.input_container}>
            <label htmlFor={id}>
                <div className={css.label}>{label}</div>
                <Select
                    className={classNameSelect}
                    classNamePrefix={css.input}
                    components={{ DropdownIndicator }}
                    placeholder={placeholder}
                    options={options}
                    id={id}
                    onChange={onChange}
                    type={type}
                    noOptionsMessage={({ inputValue }) =>
                        inputValue
                            ? 'не найдено'
                            : noOptionsMessage || 'не найдено'
                    }
                    errors={errors}
                    {...field}
                    required
                    isLoading={isLoading}
                />
            </label>
            {errors && errors[name] && (
                <div className={css.error}>{errors[name].message}</div>
            )}
            {errors && errors[label]?.type === 'required' && (
                <div className={css.error}>Обязательное поле</div>
            )}
        </div>
    );
}

export default SelectWithLabel;
