import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import entityApi from '../../../../api/entityApi';
import {
    PageMainCard,
    PageMainCardMain,
} from '../../../../components/PageMainCard/PageMainCard';
import SelectWithLabel from '../../../../components/SelectWithLabel/SelectWithLabel';
import Input from '../../../../components/Input/Input';
import css from './OrderListEditPage.module.scss';

function OrderListEditPage() {
    const [cityOptions, setCityOptions] = useState([]);
    const [pointOptions, setPointOptions] = useState([]);
    const [carOptions, setCarOptions] = useState([]);
    const [isLoadingcarOptions, setIsLoadingCarOptions] = useState(false);
    const [colorOptions, setColorOptions] = useState([]);
    const [rateOptions, setRateOptions] = useState([]);
    const [isFullTankOptions] = useState([
        { label: 'Да', value: true },
        { label: 'Нет', value: false },
    ]);
    const [isNeedChildChairOptions] = useState([
        { label: 'Да', value: true },
        { label: 'Нет', value: false },
    ]);
    const [isRightWheelOptions] = useState([
        { label: 'Да', value: true },
        { label: 'Нет', value: false },
    ]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const {
        control,
        setValue,
        watch,
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            city: null,
            [`Стоимость`]: null,
        },
        rules: { required: true },
    });

    const formData = watch();

    useEffect(() => {
        async function fetchData() {
            setIsLoadingCarOptions(true);
            const responseCity = await entityApi.getEntity({
                entity: 'city',
                page: 0,
                limit: 0,
            });
            const responseCityOptions = responseCity.data.data.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setCityOptions(responseCityOptions);

            const responseCar = await entityApi.getEntity({
                entity: 'car',
                page: 0,
                limit: 0,
            });
            const responseCarOptions = responseCar.data.data.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setCarOptions(responseCarOptions);
            setIsLoadingCarOptions(false);

            const responseRate = await entityApi.getEntity({
                entity: 'rate',
                page: 0,
                limit: 0,
            });
            const responseRateOptions = responseRate.data.data.map((item) => ({
                value: item.id,
                label: item.rateTypeId.name,
            }));
            setRateOptions(responseRateOptions);

            // if (id) {
            //     const responseRate = await entityApi.getEntity({
            //         entity: `rate/${id}`,
            //         page: 0,
            //         limit: 0,
            //     });
            //     setValue('Стоимость', responseRate.data.data.price);
            //     setValue('rate', {
            //         label: responseRate.data.data.rateTypeId.name,
            //         value: responseRate.data.data.rateTypeId.id,
            //     });
            // }
        }
        fetchData();
    }, []);

    useEffect(() => {
        setValue('point', null);
        async function fetchData() {
            if (formData.city.value) {
                const responsePoint = await entityApi.getEntity({
                    entity: `point`,
                    options: `cityId=${formData.city.value}&`,
                    page: 0,
                    limit: 0,
                });
                const responsePointOptions = responsePoint.data.data.map(
                    (item) => ({
                        value: item.id,
                        label: item.name,
                    }),
                );
                setPointOptions(responsePointOptions);
            }
        }
        fetchData();
    }, [formData.city]);

    useEffect(() => {
        setValue('colors', null);
        async function fetchData() {
            if (formData.car.value) {
                const responseColor = await entityApi.getEntity({
                    entity: `car/${formData.car.value}`,
                    page: 0,
                    limit: 0,
                });
                const responseColorOptions = responseColor.data.data.colors.map(
                    (item) => ({
                        value: item,
                        label: item,
                    }),
                );
                setColorOptions(responseColorOptions);
            }
        }
        fetchData();
    }, [formData.car]);

    const resetError = () => {
        clearErrors('rate');
    };

    const onChangeCity = () => {
        clearErrors('city');
    };

    const onChangeCar = () => {
        clearErrors('car');
    };

    const onSubmit = (data) => {
        if (!data.rate?.value) {
            setError(
                'rate',
                { type: 'select', message: 'Тариф не выбран' },
                { shouldFocus: true },
            );
        } else {
            const resultData = {
                rateTypeId: data.rate.value,
                price: data['Стоимость'],
            };
            if (id) {
                entityApi.putEntity({
                    entity: 'order',
                    id,
                    data: resultData,
                });
            } else {
                entityApi.postEntity({
                    entity: 'order',
                    data: resultData,
                });
            }
            navigate('/admin/order-list');
        }
    };

    const pageTitle = id ? 'Изменение заказа' : 'Добавление заказа';

    return (
        <PageMainCard pageTitle={pageTitle}>
            <PageMainCardMain>
                <form onSubmit={handleSubmit(onSubmit)} onChange>
                    <div className={css.central_container}>
                        <div className={css.element_container}>
                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: 'Обязательное поле' }}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Город"
                                        name="city"
                                        placeholder="Выберите город"
                                        id="orderListEditPageSelectCity"
                                        options={cityOptions}
                                        required
                                        onChange={onChangeCity}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Controller
                                name="point"
                                control={control}
                                rules={{ required: 'Обязательное поле' }}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Пункт выдачи"
                                        name="point"
                                        placeholder="Выберите пункт выдачи"
                                        noOptionsMessage="Сначала выберите город"
                                        id="orderListEditPageSelectPoint"
                                        options={pointOptions}
                                        required
                                        onChange={resetError}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Controller
                                name="car"
                                control={control}
                                rules={{ required: 'Обязательное поле' }}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Автомобиль"
                                        name="car"
                                        placeholder="Выберите автомобиль"
                                        noOptionsMessage="облом"
                                        id="orderListEditPageSelectCar"
                                        options={carOptions}
                                        required
                                        onChange={onChangeCar}
                                        isLoading={isLoadingcarOptions}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Controller
                                name="colors"
                                control={control}
                                rules={{ required: 'Обязательное поле' }}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Цвет"
                                        name="colors"
                                        placeholder="Выберите цвет"
                                        noOptionsMessage="Сначала выберите автомобиль"
                                        id="orderListEditPageSelectColors"
                                        options={colorOptions}
                                        required
                                        onChange={resetError}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Controller
                                name="rate"
                                control={control}
                                rules={{ required: 'Обязательное поле' }}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Тариф"
                                        name="rate"
                                        placeholder="Выберите тариф"
                                        id="orderListEditPageSelectRate"
                                        options={rateOptions}
                                        required
                                        onChange={resetError}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Controller
                                name="isNeedChildChair"
                                control={control}
                                rules={{ required: 'Обязательное поле' }}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Детское кресло"
                                        name="isNeedChildChair"
                                        placeholder="Нужно детское кресло?"
                                        id="orderListEditPageSelectIsNeedChildChair"
                                        options={isNeedChildChairOptions}
                                        required
                                        onChange={resetError}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Controller
                                name="isFullTank"
                                control={control}
                                rules={{ required: 'Обязательное поле' }}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Полный бак"
                                        name="isFullTank"
                                        placeholder="Нужен полный бак?"
                                        id="orderListEditPageSelectIsFullTank"
                                        options={isFullTankOptions}
                                        required
                                        onChange={resetError}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Controller
                                name="isRightWheel"
                                control={control}
                                rules={{ required: 'Обязательное поле' }}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Правый руль"
                                        name="isRightWheel"
                                        placeholder="Нужен правый руль?"
                                        id="orderListEditPageSelectIsRightWheel"
                                        options={isRightWheelOptions}
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
                                placeholder="Укажите стоимость"
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
                            <Link
                                className={css.button_secondary}
                                to="/admin/order-list"
                            >
                                Отменить
                            </Link>
                        </div>
                    </div>
                </form>
            </PageMainCardMain>
        </PageMainCard>
    );
}

export default OrderListEditPage;
