import { ReactComponent as Logo } from '../../assets/logo.svg';
import css from './AuthContainerBlock.module.scss';

function AuthContainerBlock({ children }) {
    return (
        <div className={css.container}>
            <div className={css.block}>
                <header className={css.block_header}>
                    <Logo />
                    <h2 className={css.block_header__title}>Need for drive</h2>
                </header>
                <div className={css.card}>{children}</div>
            </div>
        </div>
    );
}

export default AuthContainerBlock;
