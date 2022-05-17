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
    const [isFilterShow, setIsFilterShow] = useState(false);
    const [filterValue, setFilterValue] = useState(() =>
        filterData.map((item) => item.defaultValue),
    );

    function onClickReset() {
        reset();
    }

    useEffect(() => {
        setFilterValue(() => filterData.map((item) => item.defaultValue));
    }, [reset]);

    function onClickApply() {
        filterData.forEach((filterItem, index) => {
            filterItem.onChangeSeleсt(filterValue[index]);
        });
    }
    const classNameFilterContainer = `${css.filter_container} ${
        isFilterShow && css.filter_container_show
    }`;

    return (
        <div className={css.main_container}>
            <div className={css.button_container}>
                <button
                    className={css.button_secondary}
                    type="button"
                    onClick={() => setIsFilterShow((prev) => !prev)}
                >
                    {isFilterShow ? 'Скрыть фильтры' : 'Показать фильтры'}
                </button>
            </div>
            <div className={classNameFilterContainer}>
                <div className={css.wrap_select}>
                    {filterData.map((item, index) => (
                        <Select
                            key={item.id}
                            className={css.input}
                            classNamePrefix={css.input}
                            {...item}
                            value={filterValue[index]}
                            components={{ DropdownIndicator }}
                            onChange={(val) => {
                                setFilterValue(
                                    filterValue.map((itemMap, indexMap) =>
                                        index === indexMap ? val : itemMap,
                                    ),
                                );
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
        </div>
    );
}

export default FilterForm;
