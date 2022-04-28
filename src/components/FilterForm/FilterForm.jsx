import { useEffect, useState } from 'react';
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

function FilterForm({ filterData, reset }) {

    const [filterValue, setFilterValue] = useState(() => filterData.map(item => item.defaultValue));

    function onClickReset() {
        reset();
    }

    useEffect(() => {
        setFilterValue(() => filterData.map(item => item.defaultValue));
    }, [reset])

    function onClickApply() {
        filterData.forEach((filterItem, index) => {
            filterItem.onChangeSeleсt(filterValue[index]);
        })
    }

    return (
        <div className={css.container}>
            <div className={css.wrap_select}>
                {filterData.map((item, index) => (
                    <Select
                        key={item.id}
                        className={css.input}
                        classNamePrefix={css.input}
                        {...item}
                        value={filterValue[index]}
                        components={{ DropdownIndicator }}
                        onChange={val => {
                            setFilterValue(filterValue.map((itemMap, indexMap) => (index === indexMap) ? val : itemMap))
                        }}
                        noOptionsMessage={({ inputValue }) =>
                            inputValue ? 'не найдено' : 'не найдено'
                        }
                    />
                ))}
            </div>
            <div className={css.wrap_buttons}>
                <button
                    className={css.button_reset}
                    type="button"
                    onClick={onClickReset}
                >
                    Сбросить
                </button>
                <button
                    className={css.button}
                    type="button"
                    onClick={onClickApply}
                >
                    Применить
                </button>
            </div>
        </div>
    );
}

export default FilterForm;
