import css from './PageMainCard.module.scss';

function PageMainCard({ pageTitle, children }) {
    return (
        <div className={css.container}>
            <h1 className={css.title}>{pageTitle}</h1>
            <div className={css.card}>{children}</div>
        </div>
    );
}

export default PageMainCard;
