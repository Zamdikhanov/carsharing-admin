import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import useComponentVisible from '../hooks/useComponentVisible';
import { getFilters } from '../store/filterSlice';
import css from './TemplatePage.module.scss';
import ErrorPage from './SettingPages/ErrorPage/ErrorPage';

function TemplatePage() {
    const {
        ref: sidebarRef,
        isComponentVisible: isNavMobileVisible,
        setIsComponentVisible: setIsNavMobileVisible,
        ignoreRef: burgerRef,
    } = useComponentVisible(false);

    const dispath = useDispatch();
    const navigate = useNavigate();

    const { responseError } = useSelector((state) => state.app);

    useEffect(() => {
        if (responseError?.message) navigate('/admin/error');
    }, [responseError]);

    useEffect(() => {
        dispath(getFilters());
    }, []);

    const handleClick = () => {
        setIsNavMobileVisible(!isNavMobileVisible);
    };

    const handleClickExit = () => {
        setIsNavMobileVisible(false);
    };

    const { isFullScreen } = useSelector((state) => state.app);

    const classNameWrapper = `${css.wrapper} ${isFullScreen ? css.wrapper_fullscreen : ''
        }`;

    return (
        <div className={css.bg}>
            <div className={classNameWrapper}>
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
                            <ErrorBoundary FallbackComponent={ErrorPage}>
                                <Outlet />
                            </ErrorBoundary>
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
                                Copyright © 2022 Zamdikhanov
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplatePage;
