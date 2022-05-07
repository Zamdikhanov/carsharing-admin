import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import entityApi from '../../../../api/entityApi';
import {
    PageMainCard,
    PageMainCardMain,
} from '../../../../components/PageMainCard/PageMainCard';
import Input from '../../../../components/Input/Input';
import css from './CityListEditPage.module.scss';

function CityListEditPage() {
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
            [`Название города`]: null,
        },
        rules: { required: true },
    });

    useEffect(() => {
        let response;
        async function fetchData() {
            response = await entityApi.getEntity({
                entity: `city/${id}`,
                page: 0,
                limit: 0,
            });
            setValue(`Название города`, response.data.data.name);
        }
        if (id) fetchData();
    }, []);

    const onSubmit = (data) => {
        const resultData = {
            name: data[`Название города`],
        };
        if (id) {
            entityApi.putEntity({
                entity: 'city',
                id,
                data: resultData,
            });
        } else {
            entityApi.postEntity({
                entity: 'city',
                data: resultData,
            });
        }
        navigate('/admin/city-list');
    };

    const pageTitle = id ? 'Изменение города' : 'Добавление города';

    return (
        <PageMainCard pageTitle={pageTitle}>
            <PageMainCardMain>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.central_container}>
                        <div className={css.element_container}>
                            <Input
                                label="Название города"
                                type="text"
                                placeholder="Введите название города"
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
                        <div className={css.button_block}>
                            <button className={css.button} type="submit">
                                Сохранить
                            </button>
                            <Link
                                className={css.button_secondary}
                                to="/admin/city-list"
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

export default CityListEditPage;
