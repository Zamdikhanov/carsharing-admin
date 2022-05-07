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
import css from './RateListEditPage.module.scss';

function RateListEditPage() {
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
            rate: null,
            [`Стоимость`]: null,
        },
        rules: { required: true },
    });

    useEffect(() => {
        async function fetchData() {
            const response = await entityApi.getEntity({
                entity: 'rateType',
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
                    entity: `rate/${id}`,
                    page: 0,
                    limit: 0,
                });
                setValue('Стоимость', responseRate.data.data.price);
                setValue('rate', {
                    label: responseRate.data.data.rateTypeId.name,
                    value: responseRate.data.data.rateTypeId.id,
                });
            }
        }
        fetchData();
    }, []);

    const resetError = () => {
        clearErrors('rate');
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
                    entity: 'rate',
                    id,
                    data: resultData,
                });
            } else {
                entityApi.postEntity({
                    entity: 'rate',
                    data: resultData,
                });
            }
            navigate('/admin/rate-list');
        }
    };

    const pageTitle = id
        ? 'Изменение стоимости тарифа'
        : 'Добавление стоимости тарифа';

    return (
        <PageMainCard pageTitle={pageTitle}>
            <PageMainCardMain>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.central_container}>
                        <div className={css.element_container}>
                            <Controller
                                name="rate"
                                control={control}
                                render={({ field }) => (
                                    <SelectWithLabel
                                        errors={errors}
                                        field={field}
                                        label="Тариф"
                                        name="rate"
                                        placeholder="Выберите тариф"
                                        id="rateListEditPageSelect"
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
                            <Link
                                className={css.button_secondary}
                                to="/admin/rate-list"
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

export default RateListEditPage;
