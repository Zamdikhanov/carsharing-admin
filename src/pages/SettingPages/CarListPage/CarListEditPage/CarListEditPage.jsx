import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import entityApi from '../../../../api/entityApi';
import {
    // PageMainCard,
    PageMainCardMain,
} from '../../../../components/PageMainCard/PageMainCard';
import SelectWithLabel from '../../../../components/SelectWithLabel/SelectWithLabel';
import Input from '../../../../components/Input/Input';
import css from './CarListEditPage.module.scss';

function CarListEditPage() {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const {
        control,
        setValue,
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            rate: null,
            [`Модель автомобиля`]: null,
            [`Номер автомобиля`]: null,
            [`Описание`]: null,
            [`Минимальная цена`]: null,
            [`Максимальная цена`]: null,
            [`Количество топлива`]: null,
        },
        rules: { required: true },
    });

    useEffect(() => {
        async function fetchData() {
            const categoryResponse = await entityApi.getEntity({
                entity: 'category',
                page: 0,
                limit: 0,
            });
            const categoryResponseOptions = categoryResponse.data.data.map(
                (item) => ({
                    value: item.id,
                    label: item.name,
                }),
            );
            setCategoryOptions(categoryResponseOptions);

            if (id) {
                const responseCar = await entityApi.getEntity({
                    entity: `car/${id}`,
                    page: 0,
                    limit: 0,
                });
                const carData = responseCar.data.data;
                setValue('Модель автомобиля', carData.name);
                setValue('Номер автомобиля', carData.number);
                setValue('Описание', carData.description);
                setValue('Минимальная цена', carData.priceMin);
                setValue('Максимальная цена', carData.priceMax);
                setValue('Количество топлива', carData.tank);
                setValue('category', {
                    label: carData.categoryId.name,
                    value: carData.categoryId.id,
                });
            }
        }
        fetchData();
    }, []);

    const resetError = () => {
        clearErrors('category');
    };

    const onSubmit = (data) => {
        if (!data.category?.value) {
            setError(
                'category',
                { type: 'select', message: 'Тип не выбран' },
                { shouldFocus: true },
            );
        } else {
            const resultData = {
                categoryId: data.category.value,
                name: data['Модель автомобиля'],
                number: data['Номер автомобиля'],
                description: data['Описание'],
                priceMin: data['Минимальная цена'],
                priceMax: data['Максимальная цена'],
                tank: data['Количество топлива'],
            };
            if (id) {
                entityApi.putEntity({
                    entity: 'car',
                    id,
                    data: resultData,
                });
            } else {
                entityApi.postEntity({
                    entity: 'car',
                    data: resultData,
                });
            }
            navigate('/admin/car-list');
        }
    };

    const pageTitle = id
        ? 'Изменение параметров автомобиля'
        : 'Добавление автомобиля';

    return (
        <div className={css.container}>
            <div className={css.title_block}>
                <h1 className={css.title}>{pageTitle}</h1>
            </div>
            <div className={css.content_section}>
                <div className={css.card}>test</div>
                <div className={`${css.card} ${css.card2}`}>
                    <PageMainCardMain>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={css.central_container}>
                                <div className={css.element_container}>
                                    <Input
                                        label="Модель автомобиля"
                                        type="text"
                                        placeholder="Введите модель"
                                        register={register}
                                        required
                                        setError={setError}
                                        minLength={{
                                            value: 1,
                                            message: 'Не менее 1-го символа',
                                        }}
                                        maxLength={{
                                            value: 20,
                                            message: 'Не более 20-и символов',
                                        }}
                                        errors={errors}
                                    />
                                </div>
                                <div className={css.element_container}>
                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field }) => (
                                            <SelectWithLabel
                                                errors={errors}
                                                field={field}
                                                label="Тип автомобиля"
                                                name="category"
                                                placeholder="Выберите тип автомобиля"
                                                id="rateListEditPageSelect"
                                                options={categoryOptions}
                                                required
                                                onChange={resetError}
                                            />
                                        )}
                                    />
                                </div>
                                <div className={css.element_container}>
                                    <Input
                                        label="Номер автомобиля"
                                        type="text"
                                        placeholder="Введите номер"
                                        register={register}
                                        required
                                        setError={setError}
                                        minLength={{
                                            value: 5,
                                            message: 'Не менее 5-и символов',
                                        }}
                                        maxLength={{
                                            value: 20,
                                            message: 'Не более 20-и символов',
                                        }}
                                        errors={errors}
                                    />
                                </div>
                                <div className={css.element_container}>
                                    <Input
                                        label="Описание"
                                        type="text"
                                        placeholder="Введите описание"
                                        register={register}
                                        required
                                        setError={setError}
                                        minLength={{
                                            value: 0,
                                            message: 'Не менее 0-го символа',
                                        }}
                                        maxLength={{
                                            value: 100,
                                            message: 'Не более 100-и символов',
                                        }}
                                        errors={errors}
                                    />
                                </div>
                                <div className={css.element_container}>
                                    <Input
                                        label="Минимальная цена"
                                        type="number"
                                        placeholder="Введите минимальную стоимость"
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
                                <div className={css.element_container}>
                                    <Input
                                        label="Максимальная цена"
                                        type="number"
                                        placeholder="Введите максимальную стоимость"
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
                                <div className={css.element_container}>
                                    <Input
                                        label="Количество топлива"
                                        type="number"
                                        placeholder="Введите количество топлива"
                                        register={register}
                                        required
                                        setError={setError}
                                        min={{
                                            value: 0,
                                            message: 'Не менее 0%',
                                        }}
                                        max={{
                                            value: 100,
                                            message: 'Не более 100%',
                                        }}
                                        errors={errors}
                                    />
                                </div>

                                {/* <div className={css.element_container}>
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
                        </div> */}
                                <div className={css.button_block}>
                                    <button
                                        className={css.button}
                                        type="submit"
                                    >
                                        Сохранить
                                    </button>
                                    <Link
                                        className={css.button_secondary}
                                        to="/admin/car-list"
                                    >
                                        Отменить
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </PageMainCardMain>
                </div>
            </div>
        </div>
    );
}

export default CarListEditPage;
