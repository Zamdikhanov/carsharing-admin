import Select, { components } from 'react-select';
import css from './FilterForm.module.scss';
import { ReactComponent as DropdownSvg } from '../../assets/icons/dropdown.svg';

function DropdownIndicator(props) {
    return (
        <components.DropdownIndicator {...props}>
            <DropdownSvg />
        </components.DropdownIndicator>
    );
}

function FilterForm({ filterData }) {
    return (
        <div className={css.container}>
            <div className={css.wrap_select}>
                {filterData.map((item) => (
                    <Select
                        key={item.id}
                        className={css.input}
                        classNamePrefix={css.input}
                        {...item}
                        components={{ DropdownIndicator }}
                        onChange={val => { item.onChangeSeleсt(val) }}
                        noOptionsMessage={({ inputValue }) =>
                            inputValue ? 'не найдено' : 'не найдено'
                        }
                    />
                ))}
            </div>
            <div className={css.wrap_buttons}>
                <button className={css.button} type="button">
                    Добавить новый
                </button>
            </div>
        </div>
    );
}

export default FilterForm;
