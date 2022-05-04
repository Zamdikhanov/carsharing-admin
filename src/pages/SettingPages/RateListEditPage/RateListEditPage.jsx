import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import {
    PageMainCard,
    // PageMainCardHeader,
    PageMainCardMain,
} from '../../../components/PageMainCard/PageMainCard';
import Input from '../../../components/Input/Input';
import css from './RateListEditPage.module.scss';

function RateListEditPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const onSubmit = () => { };

    return (
        <PageMainCard pageTitle="Добавление стоимости тарифа">
            {/* <PageMainCardHeader>заголовок</PageMainCardHeader> */}
            <PageMainCardMain>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.central_container}>
                        <div className={css.element_container}>
                            <Select
                                className={css.input}
                                classNamePrefix={css.input}
                                // {...item}
                                // value={filterValue[index]}
                                // components={{ DropdownIndicator }}
                                onChange={() => { }}
                                noOptionsMessage={({ inputValue }) =>
                                    inputValue ? 'не найдено' : 'не найдено'
                                }
                            />
                        </div>
                        <div className={css.element_container}>
                            <Input
                                styles={{ flex: '1 1 320px' }}
                                label="Стоимость"
                                type="number"
                                placeholder="Введите стоимость тарифа"
                                register={register}
                                required
                                setError={setError}
                                minLength={{
                                    value: 1,
                                    message: 'Не менее 1-го символа',
                                }}
                                maxLength={{
                                    value: 10,
                                    message: 'Не более 10-и символов',
                                }}
                                errors={errors}
                            />
                        </div>
                        <div className={css.button_block}>
                            <button className={css.button} type="submit">
                                Сохранить
                            </button>
                            <Link className={css.button_secondary} to={-1}>
                                Отменить
                            </Link>
                        </div>
                    </div>
                </form>
            </PageMainCardMain>
        </PageMainCard >
    );
}

export default RateListEditPage;
