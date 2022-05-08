import css from './SideBar.module.scss';
import { ReactComponent as PointSvg } from '../../assets/icons/point.svg';
import { ReactComponent as PointsSvg } from '../../assets/icons/points.svg';
import { ReactComponent as KeySvg } from '../../assets/icons/car-key.svg';
import { ReactComponent as CarSvg } from '../../assets/icons/car.svg';
import { ReactComponent as CarCategorySvg } from '../../assets/icons/car-category.svg';
import { ReactComponent as CreditCardSvg } from '../../assets/icons/credit-card.svg';
import { ReactComponent as DollarSvg } from '../../assets/icons/dollar.svg';

const links = [
    {
        id: 'link01',
        link: '/admin/order-list',
        linkText: 'Заказы',
        icon: () => <KeySvg className={css.link_icon} />,
    },
    {
        id: 'link03',
        link: '/admin/car-list',
        linkText: 'Автомобили',
        icon: () => <CarSvg className={css.link_icon} />,
    },
    {
        id: 'link04',
        link: '/admin/category-list',
        linkText: 'Категории автомобилей',
        icon: () => <CarCategorySvg className={css.link_icon} />,
    },
    {
        id: 'link05',
        link: '/admin/city-list',
        linkText: 'Города',
        icon: () => <PointSvg className={css.link_icon} />,
    },
    {
        id: 'link06',
        link: '/admin/point-list',
        linkText: 'Точки выдачи',
        icon: () => <PointsSvg className={css.link_icon} />,
    },
    {
        id: 'link07',
        link: '/admin/rate-type-list',
        linkText: 'Типы тарифов',
        icon: () => <CreditCardSvg className={css.link_icon} />,
    },
    {
        id: 'link08',
        link: '/admin/rate-list',
        linkText: 'Стоимость тарифов',
        icon: () => <DollarSvg className={css.link_icon} />,
    },
];

export default links;
