import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input/Input';
import css from './RegistrationPage.module.scss';
import { registration } from '../../store/authSlice';
import AuthContainerBlock from '../../components/AuthContainerBlock/AuthContainerBlock';

function RegistrationPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuth) navigate('/admin/order-list/');
    }, [isAuth]);

    const onSubmit = (data) => {
        if (data['Пароль'] !== data['Повторите пароль']) {
            setError(
                'Пароль',
                { type: 'login', message: 'Пароли не совпадают' },
                { shouldFocus: false },
            );
            setError(
                'Повторите пароль',
                { type: 'login', message: 'Пароли не совпадают' },
                { shouldFocus: false },
            );
        } else {
            dispatch(
                registration({
                    username: data['Почта'],
                    password: data['Пароль'],
                }),
            );
        }
    };

    return (
        <AuthContainerBlock>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className={css.card_header}>Регистрация</h3>
                <Input
                    label="Почта"
                    type="text"
                    placeholder="Введите почту или имя пользователя"
                    register={register}
                    required
                    setError={setError}
                    minLength={{
                        value: 3,
                        message: 'Не менее 3-х символов',
                    }}
                    errors={errors}
                />
                <Input
                    label="Пароль"
                    type="password"
                    placeholder="Введите пароль"
                    register={register}
                    required
                    setError={setError}
                    minLength={{
                        value: 3,
                        message: 'Не менее 3-х символов',
                    }}
                    errors={errors}
                />
                <Input
                    label="Повторите пароль"
                    type="password"
                    placeholder="Введите пароль"
                    register={register}
                    required
                    setError={setError}
                    minLength={{
                        value: 3,
                        message: 'Не менее 3-х символов',
                    }}
                    errors={errors}
                />
                <div className={css.card_footer}>
                    <Link className={css.link} to={-1}>
                        Отмена регистрации
                    </Link>
                    <button className={css.standart_button} type="submit">
                        Регистрация
                    </button>
                </div>
            </form>
        </AuthContainerBlock>
    );
}

export default RegistrationPage;
