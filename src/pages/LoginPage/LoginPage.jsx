import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input/Input';
import css from './LoginPage.module.scss';
import { login, setAuthError } from '../../store/authSlice';
import AuthContainerBlock from '../../components/AuthContainerBlock/AuthContainerBlock';

function LoginPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/admin/order-list/';

    const { isAuth, authError } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuth) navigate(from);
    }, [isAuth]);

    useEffect(() => {
        if (authError) {
            setError(
                'Почта',
                { type: 'login', message: authError },
                { shouldFocus: false },
            );
            setError(
                'Пароль',
                { type: 'login', message: authError },
                { shouldFocus: false },
            );
        }
    }, [authError]);

    const onSubmit = (data) => {
        dispatch(setAuthError(''));
        dispatch(login({ username: data['Почта'], password: data['Пароль'] }));
    };

    return (
        <AuthContainerBlock>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className={css.card_header}>Вход</h3>
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
                <div className={css.card_footer}>
                    <Link
                        className={css.link}
                        to="/registration"
                        onClick={() => dispatch(setAuthError(''))}
                    >
                        Запросить доступ
                    </Link>
                    <button className={css.standart_button} type="submit">
                        Войти
                    </button>
                </div>
            </form>
        </AuthContainerBlock>
    );
}

export default LoginPage;
