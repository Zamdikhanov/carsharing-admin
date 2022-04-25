import { Link } from 'react-router-dom';
import css from './ErrorPage.module.scss';

function ErrorPage() {
    return (
        <div className={css.container}>
            <div className={css.error_content}>
                <div className={css.error_content__code}>
                    500
                </div>
                <div className={css.error_content__message}>
                    Что то пошло не так
                </div>
                <div className={css.error_content__tip}>
                    Попробуйте перезагрузить страницу
                </div>
                <Link className={css.error_content__button} to={-1}>
                    Назад
                </Link>
            </div>
        </div >
    )
}

export default ErrorPage;