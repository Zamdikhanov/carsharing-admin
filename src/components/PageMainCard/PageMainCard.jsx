import css from './PageMainCard.module.scss';

function PageMainCard({ pageTitle, children }) {
    return (
        <div className={css.container}>
            <h1 className={css.title}>{pageTitle}</h1>
            <div className={css.card}>{children}</div>
        </div>
    );
}

function PageMainCardHeader({ children }) {
    return (
        <div className={css.card__header}>
            {children}
        </div>
    );
}

function PageMainCardMain({ children }) {
    return (
        <div className={css.card__main}>
            {children}
        </div>
    );
}

function PageMainCardFooter({ children }) {
    return (
        <div className={css.card__footer}>
            {children}
        </div>
    );
}

export { PageMainCard, PageMainCardHeader, PageMainCardMain, PageMainCardFooter };
