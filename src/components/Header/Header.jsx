import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import css from './Header.module.scss';
import avatar from '../../assets/header/user-avatar.jpg';
import { ReactComponent as DropdownSvg } from '../../assets/header/dropdown-icon.svg';
import { ReactComponent as NotificationsSvg } from '../../assets/header/notifications.svg';
import { ReactComponent as SearchSvg } from '../../assets/header/search-icon.svg';
import useComponentVisible from '../../hooks/useComponentVisible';
import Checkbox from '../Checkbox/Checkbox';
import { setAppIsFullScreen } from '../../store/appSlice';

function Header({ onBurgerClick, isShow, burgerRef }) {
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible,
        ignoreRef: buttonRef,
    } = useComponentVisible(false);

    const { user_name: userName, data } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleClickBurger = () => {
        onBurgerClick();
    };

    const handleClickUser = () => {
        setIsComponentVisible(!isComponentVisible);
    };

    const handleClickLogout = () => {
        setIsComponentVisible(false);
        dispatch(logout(data.access_token));
    };

    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const localStorageItem =
            localStorage.getItem('isFullScreen') === 'true';
        setIsFullScreen(localStorageItem);
        dispatch(setAppIsFullScreen(localStorageItem));
    }, []);

    const changeContentWrapper = (booleanValue) => {
        setIsFullScreen(booleanValue);
        localStorage.setItem('isFullScreen', booleanValue.toString());
        dispatch(setAppIsFullScreen(booleanValue));
        setIsComponentVisible(false);
    };

    const classNameButton = `${css.nav_burger} ${isShow ? css.menu_button__active : ''
        }`;

    return (
        <header className={css.header}>
            <button
                className={classNameButton}
                type="button"
                onClick={handleClickBurger}
                ref={burgerRef}
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
                ref={buttonRef}
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
            {isComponentVisible && (
                <div className={css.user_menu} ref={ref}>
                    <div className={css.user_menu__item}>
                        <Checkbox
                            label="На весь экран"
                            checked={isFullScreen}
                            onChange={changeContentWrapper}
                        />
                    </div>
                    <button
                        className={css.user_menu__button}
                        type="button"
                        onClick={handleClickLogout}
                    >
                        Выйти
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
