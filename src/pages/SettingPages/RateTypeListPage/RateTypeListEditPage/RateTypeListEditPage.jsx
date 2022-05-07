import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import entityApi from '../../../../api/entityApi';
import {
    PageMainCard,
    PageMainCardMain,
} from '../../../../components/PageMainCard/PageMainCard';
import Input from '../../../../components/Input/Input';
import css from './RateTypeListEditPage.module.scss';

function RateTypeListEditPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const {
        setValue,
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            [`Название`]: null,
            [`Единицы измерения`]: null,
        },
        rules: { required: true },
    });

    useEffect(() => {
        let response;
        async function fetchData() {
            response = await entityApi.getEntity({
                entity: `rateType/${id}`,
                page: 0,
                limit: 0,
            });
            setValue(`Название`, response.data.data.name);
            setValue(`Единицы измерения`, response.data.data.unit);
        }
        if (id) fetchData();
    }, []);

    const onSubmit = (data) => {
        const resultData = {
            name: data[`Название`],
            unit: data[`Единицы измерения`],
        };
        if (id) {
            entityApi.putEntity({
                entity: 'rateType',
                id,
                data: resultData,
            });
        } else {
            entityApi.postEntity({
                entity: 'rateType',
                data: resultData,
            });
        }
        navigate('/admin/rate-type-list');
    };

    const pageTitle = id ? 'Изменение типа тарифа' : 'Добавление типа тарифа';

    return (
        <PageMainCard pageTitle={pageTitle}>
            <PageMainCardMain>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.central_container}>
                        <div className={css.element_container}>
                            <Input
                                label="Название"
                                type="text"
                                placeholder="Введите название тарифа"
                                register={register}
                                required
                                setError={setError}
                                minLength={{
                                    value: 3,
                                    message: 'Не менее 3-х символов',
                                }}
                                maxLength={{
                                    value: 30,
                                    message: 'Не более 30-и символов',
                                }}
                                errors={errors}
                            />
                        </div>
                        <div className={css.element_container}>
                            <Input
                                label="Единицы измерения"
                                type="text"
                                placeholder="Введите единицы измерения"
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
                        <div className={css.button_block}>
                            <button className={css.button} type="submit">
                                Сохранить
                            </button>
                            <Link
                                className={css.button_secondary}
                                to="/admin/rate-type-list"
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

export default RateTypeListEditPage;
