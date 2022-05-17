import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './ErrorPage.module.scss';

function ErrorPage({ error, resetErrorBoundary }) {
    const { responseError } = useSelector((state) => state.app);

    return (
        <div className={css.container}>
            <div className={css.error_content}>
                <div className={css.error_content__code}>
                    {error?.status || 500}
                </div>
                <div className={css.error_content__message}>
                    {error?.message ||
                        responseError?.message ||
                        'Что то пошло не так'}
                </div>
                <div className={css.error_content__tip}>
                    Попробуйте перезагрузить страницу
                </div>
                <Link
                    className={css.error_content__button}
                    to={-1}
                    onClick={resetErrorBoundary}
                >
                    Назад
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
