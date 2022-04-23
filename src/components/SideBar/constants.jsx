import css from './SideBar.module.scss';
import { ReactComponent as PenSvg } from '../../assets/menu/pen-icon.svg';
import { ReactComponent as CarListSvg } from '../../assets/menu/list-icon.svg';
import { ReactComponent as OrderSvg } from '../../assets/menu/order-icon.svg';
import { ReactComponent as Menu4Svg } from '../../assets/menu/menu4-icon.svg';
import { ReactComponent as Menu5Svg } from '../../assets/menu/menu5-icon.svg';
import { ReactComponent as UserSvg } from '../../assets/menu/user-icon.svg';
import { ReactComponent as Menu7Svg } from '../../assets/menu/menu7-icon.svg';

const links = [
    {
        id: 'link01',
        link: '/admin/order-list',
        linkText: 'Заказы',
        icon: () => <OrderSvg className={css.link_icon} />,
    },
    {
        id: 'link02',
        link: '/admin/car-setting',
        linkText: 'Карточка автомобиля',
        icon: () => <PenSvg className={css.link_icon} />,
    },
    {
        id: 'link03',
        link: '/admin/car-list',
        linkText: 'Автомобили',
        icon: () => <CarListSvg className={css.link_icon} />,
    },
    {
        id: 'link04',
        link: '/admin/category-list',
        linkText: 'Категории автомобилей',
        icon: () => <Menu4Svg className={css.link_icon} />,
    },
    {
        id: 'link05',
        link: '/admin/city-list',
        linkText: 'Города',
        icon: () => <Menu5Svg className={css.link_icon} />,
    },
    {
        id: 'link06',
        link: '/admin/menu6',
        linkText: 'Меню 6',
        icon: () => <UserSvg className={css.link_icon} />,
    },
    {
        id: 'link07',
        link: '/admin/menu7',
        linkText: 'Меню 7',
        icon: () => <Menu7Svg className={css.link_icon} />,
    },
];

export default links;
