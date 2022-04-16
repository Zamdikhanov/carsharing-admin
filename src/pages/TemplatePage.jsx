import { NavLink, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import useComponentVisible from '../hooks/useComponentVisible';
import css from './TemplatePage.module.scss';

function TemplatePage() {

    const { ref, isComponentVisible, setIsComponentVisible, ignoreRef: burgerRef } =
        useComponentVisible(false);

    const handleClick = () => {
        setIsComponentVisible(!isComponentVisible);
    };

    const handleClickExit = () => {
        setIsComponentVisible(false);
    };

    return (
        <div className={css.bg}>
            <div className={css.wrapper}>
                <div className={css.page}>
                    <nav
                        className={`${css.nav} 
                        ${isComponentVisible ? css.nav_showOnMobile : ''}`}
                    >
                        <SideBar onClick={handleClickExit} ref={ref} />
                    </nav>
                    <div className={css.main_container}>
                        <div className={css.header}>
                            <Header
                                onBurgerClick={handleClick}
                                isShow={isComponentVisible}
                                burgerRef={burgerRef}
                            />
                        </div>
                        <main className={css.main}>
                            <Outlet />
                        </main>
                        <footer className={css.footer}>
                            <ul className={css.link_list}>
                                <li className={css.link_list__item}>
                                    <NavLink className={css.link} to="/">
                                        Главная страница
                                    </NavLink>
                                </li>
                                <li className={css.link_list__item}>
                                    <a
                                        className={css.link}
                                        href="https://zamdikhanov.github.io/carsharing/"
                                    >
                                        Need for drive
                                    </a>
                                </li>
                            </ul>
                            <div className={css.copy}>
                                Copyright © 2022 Simbirsoft
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplatePage;
