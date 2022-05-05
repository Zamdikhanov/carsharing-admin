import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import rateTypeApi from '../../../api/rateTypeApi';
import {
    PageMainCard,
    PageMainCardMain,
} from '../../../components/PageMainCard/PageMainCard';
import SelectWithLabel from '../../../components/SelectWithLabel/SelectWithLabel';
import Input from '../../../components/Input/Input';
import css from './RateListEditPage.module.scss';

function RateListEditPage() {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let response;
        async function fetchData() {
            response = await rateTypeApi.getRateType({ page: 0, limit: 0 });
            const responseOptions = response.data.data.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setOptions(responseOptions);
        }
        fetchData();
    }, []);

    const {
        control,
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            select: () => options[0],
        },
        rules: { required: true },
    });

    const resetError = () => {
        console.log('reset clicked');
        clearErrors('Тариф');
    };

    const onSubmit = (data) => {
        if (!data['Тариф']?.value) {
            setError(
                'Тариф',
                { type: 'select', message: 'Тариф не выбран' },
                { shouldFocus: false },
            );
        } else {
            const data2 = {
                rateTypeId: data['Тариф'].value,
                price: data['Стоимость'],
            };
            console.log('result', data2);
        }
    };

    return (
        <PageMainCard pageTitle="Добавление стоимости тарифа">
            <PageMainCardMain>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.central_container}>
                        <div className={css.element_container}>
                            <Controller
                                name="Тариф"
                                control={control}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Тариф"
                                        placeholder="Выберите тариф"
                                        id="rateListEditPageSelet"
                                        options={options}
                                        required
                                        onChange={resetError}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Input
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
        </PageMainCard>
    );
}

export default RateListEditPage;
