import OrderListRow from "../../../components/OrderListRow/OrderListRow";
import order from "./constants";
import css from "./OrderListPage.module.scss";

function OrderListPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Заказы</h1>
      <div className={css.card}>
        <div className={css.card__header}>filter block</div>
        <div className={css.card__main}>
          <OrderListRow {...order} />
        </div>
        <div className={css.card__footer}>footer</div>
      </div>
    </div>
  );
}

export default OrderListPage;
