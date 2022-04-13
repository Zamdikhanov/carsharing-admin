import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import css from './PageNotFound.module.scss';

function PageNotFound() {
    return (
        <div className={css.container}>
            <div className={css.content_block}>
                <Logo className={css.content_block__logo} />
                <h3 className={css.content_block__code}>404</h3>
                <div className={css.content_block__message}>
                    Страница не найдена
                </div>
                <Link className={css.content_block__link} to="/admin">
                    Перейти на главную
                </Link>
            </div>
        </div>
    );
}

export default PageNotFound;
