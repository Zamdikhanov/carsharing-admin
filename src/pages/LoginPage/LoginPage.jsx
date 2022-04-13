import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Input from '../../components/Input/Input';
import css from './LoginPage.module.scss';
import { login } from '../../store/authSlice';

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const onSubmit = (data) => {
        const data2 = { username: data['Почта'], password: data['Пароль'] };
        console.log(data2);
        dispatch(login(data2));
        navigate('/admin/order-list/');
    };

    return (
        <div className={css.container}>
            <div className={css.block}>
                <header className={css.block_header}>
                    <Logo />
                    <h2 className={css.block_header__title}>Need for drive</h2>
                </header>
                <form className={css.card} onSubmit={handleSubmit(onSubmit)}>
                    <h3 className={css.card_header}>Вход</h3>
                    <Input
                        label="Почта"
                        type="text"
                        placeholder="Введите почту или имя пользователя"
                        register={register}
                        required
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
                        minLength={{
                            value: 3,
                            message: 'Не менее 3-х символов',
                        }}
                        errors={errors}
                    />
                    <div className={css.card_footer}>
                        <button className={css.button} type="button">
                            Запросить доступ
                        </button>
                        <button className={css.standart_button} type="submit">
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
