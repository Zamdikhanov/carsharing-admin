import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import entityApi from '../../../../api/entityApi';
import {
    PageMainCard,
    PageMainCardMain,
} from '../../../../components/PageMainCard/PageMainCard';
import Input from '../../../../components/Input/Input';
import css from './CategoryListEditPage.module.scss';

function CategoryListEditPage() {
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
            [`Описание`]: null,
        },
        rules: { required: true },
    });

    useEffect(() => {
        let response;
        async function fetchData() {
            response = await entityApi.getEntity({
                entity: `category/${id}`,
                page: 0,
                limit: 0,
            });
            setValue(`Название`, response.data.data.name);
            setValue(`Описание`, response.data.data.description);
        }
        if (id) fetchData();
    }, []);

    const onSubmit = (data) => {
        const resultData = {
            name: data[`Название`],
            description: data[`Описание`],
        };
        if (id) {
            entityApi.putEntity({
                entity: 'category',
                id,
                data: resultData,
            });
        } else {
            entityApi.postEntity({
                entity: 'category',
                data: resultData,
            });
        }
        navigate('/admin/category-list');
    };

    const pageTitle = id ? 'Изменение категории' : 'Добавление категории';

    return (
        <PageMainCard pageTitle={pageTitle}>
            <PageMainCardMain>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={css.central_container}>
                        <div className={css.element_container}>
                            <Input
                                label="Название"
                                type="text"
                                placeholder="Введите название категории"
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
                                label="Описание"
                                type="text"
                                placeholder="Введите описание"
                                register={register}
                                required
                                setError={setError}
                                minLength={{
                                    value: 4,
                                    message: 'Не менее 4-х символа',
                                }}
                                maxLength={{
                                    value: 50,
                                    message: 'Не более 50-и символов',
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
                                to="/admin/category-list"
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

export default CategoryListEditPage;
