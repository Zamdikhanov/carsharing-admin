import css from './SideBar.module.scss';
import { ReactComponent as PenSvg } from "../../assets/menu/pen-icon.svg";
import { ReactComponent as CarListSvg } from "../../assets/menu/list-icon.svg";
import { ReactComponent as OrderSvg } from "../../assets/menu/order-icon.svg";
import { ReactComponent as Menu4Svg } from "../../assets/menu/menu4-icon.svg";
import { ReactComponent as Menu5Svg } from "../../assets/menu/menu5-icon.svg";
import { ReactComponent as UserSvg } from "../../assets/menu/user-icon.svg";
import { ReactComponent as Menu7Svg } from "../../assets/menu/menu7-icon.svg";
const links = [
  {
    id: "link01",
    link: "/",
    linkText: "Карточка автомобиля",
    icon: () => <PenSvg className={css.link_icon} />,
  },
  {
    id: "link02",
    link: "/1",
    linkText: "Список авто",
    icon: () => <CarListSvg className={css.link_icon} />,
  },
  {
    id: "link03",
    link: "/order-list",
    linkText: "Список заказов",
    icon: () => <OrderSvg className={css.link_icon} />,
  },
  {
    id: "link04",
    link: "/4",
    linkText: "Меню 4",
    icon: () => <Menu4Svg className={css.link_icon} />,
  },
  {
    id: "link05",
    link: "/5",
    linkText: "Меню 5",
    icon: () => <Menu5Svg className={css.link_icon} />,
  },
  {
    id: "link06",
    link: "/6",
    linkText: "Меню 6",
    icon: () => <UserSvg className={css.link_icon} />,
  },
  {
    id: "link07",
    link: "/7",
    linkText: "Меню 7",
    icon: () => <Menu7Svg className={css.link_icon} />,
  },
];

export default links;
