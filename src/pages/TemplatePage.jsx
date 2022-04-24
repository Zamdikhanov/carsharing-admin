import { NavLink, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import useComponentVisible from '../hooks/useComponentVisible';
import css from './TemplatePage.module.scss';

function TemplatePage() {
    const {
        ref: sidebarRef,
        isComponentVisible: isNavMobileVisible,
        setIsComponentVisible: setIsNavMobileVisible,
        ignoreRef: burgerRef,
    } = useComponentVisible(false);

    const handleClick = () => {
        setIsNavMobileVisible(!isNavMobileVisible);
    };

    const handleClickExit = () => {
        setIsNavMobileVisible(false);
    };

    console.log('TemplatePage');

    return (
        <div className={css.bg}>
            <div className={css.wrapper}>
                <div
                    className={`${css.page}
                    ${isNavMobileVisible ? css.page_shade : ''}`}
                >
                    <nav
                        className={`${css.nav} 
                        ${isNavMobileVisible ? css.nav_showOnMobile : ''}`}
                    >
                        <SideBar onClick={handleClickExit} ref={sidebarRef} />
                    </nav>
                    <div className={css.main_container}>
                        <div className={css.header}>
                            <Header
                                onBurgerClick={handleClick}
                                isShow={isNavMobileVisible}
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
                                        target="_blank"
                                        rel="noopener noreferrer"
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
