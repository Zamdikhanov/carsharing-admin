import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import css from './TemplatePage.module.scss';

function TemplatePage() {
    const [isShow, setIsShow] = useState(false);

    const handleClick = () => {
        setIsShow(!isShow);
        const back = document.querySelector('body');
        back.classList.toggle('lock');
    };
    return (
        <div className={css.bg}>
            <div className={css.wrapper}>
                <div className={css.page}>
                    <nav
                        className={`${css.nav} 
                        ${isShow ? css.nav_showOnMobile : ''}`}
                    >
                        <SideBar onClick={handleClick} />
                    </nav>
                    <div className={css.main_container}>
                        <div className={css.header}>
                            <Header
                                onBurgerClick={handleClick}
                                isShow={isShow}
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