import { Link } from 'react-router-dom';
import css from './PageMainCard.module.scss';

function PageMainCard({ pageTitle, children, addButton }) {
    return (
        <div className={css.container}>
            <div className={css.title_block}>
                <h1 className={css.title}>{pageTitle}</h1>
                {addButton && (
                    <Link className={css.button} to="edit">
                        Добавить
                    </Link>
                )}
            </div>
            <div className={css.card}>{children}</div>
        </div>
    );
}

function PageMainCardHeader({ children }) {
    return <div className={css.card__header}>{children}</div>;
}

function PageMainCardMain({ children }) {
    return <div className={css.card__main}>{children}</div>;
}

function PageMainCardFooter({ children }) {
    return <div className={css.card__footer}>{children}</div>;
}

export {
    PageMainCard,
    PageMainCardHeader,
    PageMainCardMain,
    PageMainCardFooter,
};
