import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import entityApi from '../../../../api/entityApi';
import { PageMainCard, PageMainCardMain } from '../../../../components/PageMainCard/PageMainCard';
import SelectWithLabel from '../../../../components/SelectWithLabel/SelectWithLabel';
import Input from '../../../../components/Input/Input';
import css from './OrderListEditPage.module.scss';
import Preloader from '../../../../components/Preloader/Preloader';

function OrderListEditPage() {
    const [cityOptions, setCityOptions] = useState([]);
    const [pointOptions, setPointOptions] = useState([]);
    const [carOptions, setCarOptions] = useState([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);
    const [colorOptions, setColorOptions] = useState([]);
    const [rateOptions, setRateOptions] = useState([]);
    const [orderStatusOptions, setOrderStatusOptions] = useState([]);
    const [dateFromOptions, setDateFromOptions] = useState(null);
    const [dateToOptions, setDateToOptions] = useState(null);
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
            setIsLoadingOptions(true);
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

            const responseOrderStatus = await entityApi.getEntity({
                entity: 'orderStatus',
                page: 0,
                limit: 0,
            });
            const responseOrderStatusOptions = responseOrderStatus.data.data.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setOrderStatusOptions(responseOrderStatusOptions);

            if (id) {
                const responseOrder = await entityApi.getEntity({
                    entity: `order/${id}`,
                    page: 0,
                    limit: 0,
                });
                setValue('city', {
                    label: responseOrder.data.data?.cityId?.name,
                    value: responseOrder.data.data?.cityId?.id,
                });
                setValue('point', {
                    label: responseOrder.data.data?.pointId?.address,
                    value: responseOrder.data.data?.pointId?.id,
                });
                setValue('car', {
                    label: responseOrder.data.data?.carId?.name,
                    value: responseOrder.data.data?.carId?.id,
                });
                setValue('color', {
                    label: responseOrder.data.data?.color || 'Любой',
                    value: responseOrder.data.data?.color || null,
                });
                setValue('rate', {
                    label: responseOrder.data.data?.rateId?.rateTypeId?.name,
                    value: responseOrder.data.data?.rateId.id,
                });
                setDateFromOptions(responseOrder.data.data?.dateFrom);
                setDateToOptions(responseOrder.data.data?.dateTo);
                setValue('isFullTank', {
                    label: responseOrder.data.data?.isFullTank ? 'Да' : 'Нет',
                    value: responseOrder.data.data?.isFullTank,
                });
                setValue('isNeedChildChair', {
                    label: responseOrder.data.data?.isNeedChildChair ? 'Да' : 'Нет',
                    value: responseOrder.data.data?.isNeedChildChair,
                });
                setValue('isRightWheel', {
                    label: responseOrder.data.data?.isRightWheel ? 'Да' : 'Нет',
                    value: responseOrder.data.data?.isRightWheel,
                });
                setValue('Стоимость', responseOrder.data.data.price);
                setValue('orderStatus', {
                    label: responseOrder.data.data?.orderStatusId?.name,
                    value: responseOrder.data.data?.orderStatusId?.id,
                });
            }
            setIsLoadingOptions(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
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
                        label: item.address,
                    }),
                );
                setPointOptions(responsePointOptions);
                const res = responsePointOptions.some(el => el.value === formData.point.value);
                if (!res) setValue('point', null);
            }
        }
        fetchData();
    }, [formData.city]);

    useEffect(() => {
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
                setColorOptions([...responseColorOptions, { value: null, label: 'Любой' }]);
                const res = responseColorOptions.some(el => el.value === formData.color.value);
                if (!res) setValue('color', null);
            }
        }
        fetchData();
    }, [formData.car]);

    const onSubmit = (data) => {
        const resultData = {
            cityId: data.city.value,
            pointId: data.point.value,
            carId: data.car.value,
            color: data.color.value,
            dateFrom: dateFromOptions,
            dateTo: dateToOptions,
            rateId: data.rate.value,
            price: data[`Стоимость`],
            isFullTank: data.isFullTank.value,
            isNeedChildChair: data.isNeedChildChair.value,
            isRightWheel: data.isRightWheel.value,
            orderStatusId: data.orderStatus.value,
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
    };

    const pageTitle = id ? 'Изменение заказа' : 'Добавление заказа';

    return (
        <PageMainCard pageTitle={pageTitle}>
            <PageMainCardMain>
                {isLoadingOptions ? <Preloader />
                    : (
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
                                                onChange={() => { clearErrors('city') }}
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
                                                onChange={() => { clearErrors('point') }}
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
                                                onChange={() => { clearErrors('car') }}
                                                isLoading={isLoadingOptions}
                                            />
                                        )}
                                    />
                                </div>
                                <div className={css.element_container}>
                                    <Controller
                                        name="color"
                                        control={control}
                                        rules={{ required: 'Обязательное поле' }}
                                        render={({ field }) => (
                                            <SelectWithLabel
                                                errors={errors}
                                                field={field}
                                                label="Цвет"
                                                name="color"
                                                placeholder="Выберите цвет"
                                                noOptionsMessage="Сначала выберите автомобиль"
                                                id="orderListEditPageSelectColors"
                                                options={colorOptions}
                                                required
                                                onChange={() => { clearErrors('color') }}
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
                                                onChange={() => { clearErrors('rate') }}
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
                                                onChange={() => { clearErrors('isNeedChildChair') }}
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
                                                onChange={() => { clearErrors('isFullTank') }}
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
                                                onChange={() => { clearErrors('isRightWheel') }}
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
                                <div className={css.element_container}>
                                    <Controller
                                        name="orderStatus"
                                        control={control}
                                        rules={{ required: 'Обязательное поле' }}
                                        render={({ field }) => (
                                            <SelectWithLabel
                                                errors={errors}
                                                field={field}
                                                label="Статус заказа"
                                                name="orderStatus"
                                                placeholder="Статус заказа"
                                                id="orderListEditPageSelectOrderStatus"
                                                options={orderStatusOptions}
                                                required
                                                onChange={() => { clearErrors('orderStatus') }}
                                            />
                                        )}
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
                    )}
            </PageMainCardMain>
        </PageMainCard>
    );
}

export default OrderListEditPage;
