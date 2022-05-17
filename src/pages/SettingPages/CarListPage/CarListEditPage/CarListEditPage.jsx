import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import entityApi from '../../../../api/entityApi';
import SelectWithLabel from '../../../../components/SelectWithLabel/SelectWithLabel';
import Input from '../../../../components/Input/Input';
import carStubPicture from '../../../../assets/images/car-stub-picture.png';
import css from './CarListEditPage.module.scss';
import TextArea from '../../../../components/TextArea/TextArea';
import InputFile from '../../../../components/InputFile/InputFile';
import { setManualRerender } from '../../../../store/appSlice';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import InputWithButton from '../../../../components/InputWithButton/InputWithButton';

function CarListEditPage() {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [colors, setColors] = useState([]);
    const [preview, setPreview] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
            category: null,
            [`Модель автомобиля`]: null,
            [`Фото автомобиля`]: {
                path: '',
                mimetype: '',
                originalname: '',
                size: 0,
            },
            [`Номер автомобиля`]: null,
            [`Описание`]: null,
            [`Минимальная цена`]: null,
            [`Максимальная цена`]: null,
            [`Количество топлива`]: null,
        },
        rules: { required: true },
    });

    const formData = watch();

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
                const car = responseCar.data.data;
                setValue('Модель автомобиля', car.name);
                setValue('Номер автомобиля', car.number);
                setValue('Описание', car.description);
                setValue('Минимальная цена', car.priceMin);
                setValue('Максимальная цена', car.priceMax);
                setValue('Количество топлива', car.tank);
                setValue('Фото автомобиля', {
                    path: car.thumbnail.path,
                    mimetype: car.thumbnail.mimetype,
                    originalname: car.thumbnail.originalname,
                    size: car.thumbnail.size,
                });
                setPreview({
                    path: car.thumbnail.path,
                    mimetype: car.thumbnail.mimetype,
                    originalname: car.thumbnail.originalname,
                    size: car.thumbnail.size,
                });
                setValue('category', {
                    label: car.categoryId.name,
                    value: car.categoryId.id,
                });
                setColors(car.colors);
            }
        }
        fetchData();
    }, []);

    const resetError = () => {
        clearErrors('category');
    };

    const convert = async (e) => {
        clearErrors('Фото автомобиля');
        const file = e.target.files[0];
        const reader = new FileReader();
        await reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview({
                path: reader.result,
                size: file.size,
                originalname: file.name,
                mimetype: file.type,
            });
        };
    };

    const onSubmit = (data) => {
        if (!preview?.path) {
            setError(
                'Фото автомобиля',
                { type: 'file', message: 'Фото не выбрано' },
                { shouldFocus: true },
            );
        } else {
            const resultData = {
                categoryId: { id: data.category.value },
                name: data['Модель автомобиля'],
                number: data['Номер автомобиля'],
                description: data['Описание'],
                priceMin: data['Минимальная цена'],
                priceMax: data['Максимальная цена'],
                tank: data['Количество топлива'],
                colors,
                thumbnail: preview,
            };
            if (id) {
                (async function () {
                    await entityApi.putEntity({
                        entity: 'car',
                        id,
                        data: resultData,
                    });
                    setTimeout(dispatch(setManualRerender()), 0);
                })();
            } else {
                (async function () {
                    await entityApi.postEntity({
                        entity: 'car',
                        data: resultData,
                    });
                    setTimeout(dispatch(setManualRerender()), 0);
                })();
            }
            navigate('/admin/car-list');
        }
    };

    const pageTitle = id
        ? 'Изменение параметров автомобиля'
        : 'Добавление автомобиля';

    const handleSetColorsClick = (currentValue, setNewValue) => {
        if (currentValue !== '' && !colors.includes(currentValue)) {
            setColors([...colors, currentValue]);
        }
        setNewValue('');
    };

    const onClickCheckboxColor = (color) => {
        setColors(colors.filter((colorItem) => colorItem !== color));
    };

    return (
        <div className={css.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={css.title_block}>
                    <h1 className={css.title}>{pageTitle}</h1>
                </div>
                <div className={css.content_section}>
                    <section className={css.card}>
                        <div className={css.image_load_block}>
                            <div className={css.imageContainer}>
                                <img
                                    className={css.carImage}
                                    src={
                                        preview
                                            ? preview.path
                                            : formData['Фото автомобиля']
                                                  ?.path || carStubPicture
                                    }
                                    alt="Автомобиль"
                                />
                            </div>
                            <div className={css.image_load_block__carName}>
                                {formData[`Модель автомобиля`] ||
                                    'Модель автомобиля'}
                            </div>
                            <div className={css.image_load_block__category}>
                                {formData.category?.label ||
                                    'Категория автомобиля'}
                            </div>
                            <InputFile
                                label="Фото автомобиля"
                                buttonText="Обзор"
                                type="file"
                                placeholder={
                                    formData[`Фото автомобиля`]?.originalname ||
                                    preview?.originalname || (
                                        <span> Выберите файл...</span>
                                    )
                                }
                                register={register}
                                setError={setError}
                                errors={errors}
                                onChange={convert}
                            />
                        </div>
                        <div className={css.decription_block}>
                            <h4 className={css.decription_block__title}>
                                Описание
                            </h4>
                            <div className={css.decription_block__text}>
                                {formData[`Описание`] || ''}
                            </div>
                        </div>
                    </section>
                    <section className={`${css.card} ${css.card2}`}>
                        <div className={css.card_header}>
                            <h3 className={css.card_header__title}>
                                Настройки автомобиля
                            </h3>
                        </div>
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
                                    rules={{ required: 'Обязательное поле' }}
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
                            <div className={css.element_container}>
                                <div className={css.colorsField}>
                                    <InputWithButton
                                        label="Доступные цвета"
                                        placeholder="Введите цвет"
                                        type="text"
                                        onClick={handleSetColorsClick}
                                    />
                                </div>
                                {colors.map((color) => (
                                    <Checkbox
                                        key={color}
                                        id={color}
                                        label={color}
                                        disabled={false}
                                        checked
                                        onChange={() =>
                                            onClickCheckboxColor(color)
                                        }
                                    />
                                ))}
                                <div style={{ height: '16px', opacity: '0' }}>
                                    .
                                </div>
                            </div>
                            <div className={css.element_container}>
                                <TextArea
                                    label="Описание"
                                    type="text"
                                    placeholder="Введите описание"
                                    register={register}
                                    setError={setError}
                                    maxLength={{
                                        value: 300,
                                        message: 'Не более 300-и символов',
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
                                    to="/admin/car-list"
                                >
                                    Отменить
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </form>
        </div>
    );
}

export default CarListEditPage;
