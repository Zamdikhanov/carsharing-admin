import { useState, useEffect } from 'react';
import css from './Header.module.scss';
import avatar from '../../assets/header/user-avatar.jpg';
import { ReactComponent as DropdownSvg } from '../../assets/header/dropdown-icon.svg';
import { ReactComponent as NotificationsSvg } from '../../assets/header/notifications.svg';
import { ReactComponent as SearchSvg } from '../../assets/header/search-icon.svg';

function Header({ onBurgerClick, isShow }) {
    const [burgerShow, setBurgerShow] = useState(isShow);
    useEffect(() => {
        setBurgerShow(isShow);
    }, []);
    useEffect(() => {
        setBurgerShow(isShow);
    }, [isShow]);
    const handleClick = () => {
        onBurgerClick();
    };
    return (
        <header className={css.header}>
            <button
                className={`${css.nav_burger}
                    ${burgerShow ? css.menu_button__active : ''}
                    `}
                type="button"
                onClick={handleClick}
            >
                <span />
            </button>
            <label className={css.search_container}>
                <SearchSvg className={css.search_image} />
                <input
                    className={css.search}
                    placeholder="Поиск …"
                    type="search"
                />
            </label>
            <button className={css.notifications} type="button">
                <NotificationsSvg className={css.notifications__svg} />
                <div className={css.notifications__count}>2</div>
            </button>
            <button className={css.user_details} type="button">
                <img
                    className={css.user_details__image}
                    src={avatar}
                    alt="avatar"
                />
                <div className={css.user_details__name}>Admin</div>
                <div className={css.user_details__dropdown}>
                    <DropdownSvg className={css.user_details__dropdown_svg} />
                </div>
            </button>
        </header>
    );
}

export default Header;
