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
import css from './PointListEditPage.module.scss';

function PointListEditPage() {
    const [options, setOptions] = useState([]);
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
            city: null,
            [`Адрес пункта`]: null,
            [`Название пункта`]: null,
        },
        rules: { required: true },
    });

    useEffect(() => {
        async function fetchData() {
            const response = await entityApi.getEntity({
                entity: 'city',
                page: 0,
                limit: 0,
            });
            const responseOptions = response.data.data.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setOptions(responseOptions);

            if (id) {
                const responseRate = await entityApi.getEntity({
                    entity: `point/${id}`,
                    page: 0,
                    limit: 0,
                });
                setValue(`Адрес пункта`, responseRate.data.data.address);
                setValue(`Название пункта`, responseRate.data.data.name);
                setValue('city', {
                    label: responseRate.data.data.cityId.name,
                    value: responseRate.data.data.cityId.id,
                });
            }
        }
        fetchData();
    }, []);

    const resetError = () => {
        clearErrors('city');
    };

    const onSubmit = (data) => {
        if (!data.city?.value) {
            setError(
                'city',
                { type: 'select', message: 'Город не выбран' },
                { shouldFocus: true },
            );
        } else {
            const resultData = {
                cityId: data.city.value,
                address: data[`Адрес пункта`],
                name: data[`Название пункта`],
            };
            if (id) {
                entityApi.putEntity({
                    entity: 'point',
                    id,
                    data: resultData,
                });
            } else {
                entityApi.postEntity({
                    entity: 'point',
                    data: resultData,
                });
            }
            navigate('/admin/point-list');
        }
    };

    const pageTitle = id ? 'Изменение точки выдачи' : 'Добавление точки выдачи';

    return (
        <PageMainCard pageTitle={pageTitle}>
            <PageMainCardMain>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                        id="pointListEditPageSelect"
                                        options={options}
                                        required
                                        onChange={resetError}
                                    />
                                )}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Input
                                label="Адрес пункта"
                                type="text"
                                placeholder="Введите адрес пункта"
                                register={register}
                                required
                                setError={setError}
                                minLength={{
                                    value: 5,
                                    message: 'Не менее 5-и символов',
                                }}
                                maxLength={{
                                    value: 40,
                                    message: 'Не более 40-а символов',
                                }}
                                errors={errors}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Input
                                label="Название пункта"
                                type="text"
                                placeholder="Введите название пункта"
                                register={register}
                                required
                                setError={setError}
                                minLength={{
                                    value: 2,
                                    message: 'Не менее 2-х символов',
                                }}
                                maxLength={{
                                    value: 30,
                                    message: 'Не более 30-и символов',
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
                                to="/admin/point-list"
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

export default PointListEditPage;
