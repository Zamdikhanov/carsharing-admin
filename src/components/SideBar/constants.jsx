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
    icon: () => <PenSvg />,
  },
  {
    id: "link02",
    link: "/1",
    linkText: "Список авто",
    icon: () => <CarListSvg />,
  },
  {
    id: "link03",
    link: "/order-list",
    linkText: "Список заказов",
    icon: () => <OrderSvg />,
  },
  {
    id: "link04",
    link: "/4",
    linkText: "Меню 4",
    icon: () => <Menu4Svg />,
  },
  {
    id: "link05",
    link: "/5",
    linkText: "Меню 5",
    icon: () => <Menu5Svg />,
  },
  {
    id: "link06",
    link: "/6",
    linkText: "Меню 6",
    icon: () => <UserSvg />,
  },
  {
    id: "link07",
    link: "/7",
    linkText: "Меню 7",
    icon: () => <Menu7Svg />,
  },
];

export default links;
