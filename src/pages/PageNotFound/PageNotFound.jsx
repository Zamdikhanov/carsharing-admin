import { Link } from 'react-router-dom';
import AuthContainerBlock from '../../components/AuthContainerBlock/AuthContainerBlock';
import css from './PageNotFound.module.scss';

function PageNotFound() {
    return (
        <AuthContainerBlock>
            <div className={css.content_block}>
                <h3 className={css.content_block__code}>404</h3>
                <div className={css.content_block__message}>
                    Страница не найдена
                </div>
                <Link className={css.content_block__link} to="/">
                    Перейти на главную
                </Link>
                <Link className={css.content_block__link} to={-1}>
                    Вернуться назад
                </Link>
            </div>
        </AuthContainerBlock>
    );
}

export default PageNotFound;
