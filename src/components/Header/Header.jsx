import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import css from './Header.module.scss';
import avatar from '../../assets/header/user-avatar.jpg';
import { ReactComponent as DropdownSvg } from '../../assets/header/dropdown-icon.svg';
import { ReactComponent as NotificationsSvg } from '../../assets/header/notifications.svg';
import { ReactComponent as SearchSvg } from '../../assets/header/search-icon.svg';

function Header({ onBurgerClick, isShow }) {
    const [burgerShow, setBurgerShow] = useState(isShow);
    const [userMenuShow, setUserMenuShow] = useState(false);

    const { user_name: userName, data } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        setBurgerShow(isShow);
    }, [isShow]);

    const handleClick = () => {
        onBurgerClick();
    };

    const handleClickUser = () => {
        setUserMenuShow(!userMenuShow);
    };

    const handleClickExit = () => {
        setUserMenuShow(!userMenuShow);
        dispatch(logout(data.access_token));
    };

    const classNameUserMenu = `${css.user_menu} ${userMenuShow ? css.user_menu_show : ''
        }`;

    const classNameButton = `${css.nav_burger} ${burgerShow ? css.menu_button__active : ''
        }`;

    return (
        <header className={css.header}>
            <button
                className={classNameButton}
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
            <button
                className={css.user_details}
                type="button"
                onClick={handleClickUser}
            >
                <img
                    className={css.user_details__image}
                    src={avatar}
                    alt="avatar"
                />
                <div className={css.user_details__name}>{userName}</div>
                <div className={css.user_details__dropdown}>
                    <DropdownSvg className={css.user_details__dropdown_svg} />
                </div>
            </button>
            <div className={classNameUserMenu}>
                <button
                    className={css.user_menu__button}
                    type="button"
                    onClick={handleClickExit}>
                    Выйти
                </button>
            </div>
        </header>
    );
}

export default Header;
