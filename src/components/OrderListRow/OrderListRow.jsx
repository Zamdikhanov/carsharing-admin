import css from "./OrderListRow.module.scss";

function OrderListRow(order) {
  const {
    carId,
    cityId,
    pointId,
    // dateFrom,
    // dateTo,
    color,
    // price,
    isFullTank,
    // isNeedChildChair,
    // isRightWheel,
  } = order;
  console.log(order);
  return (
    <div className={css.container}>
      <div className={css.aboutCar}>
        <div className={css.details_list}>
          <div className={css.details_list__row}>
            {carId.name} в {cityId.name},{pointId.address}
          </div>
          <div className={css.details_list__row}>Details</div>
          <div className={css.details_list__row}>Цвет: {color}</div>
        </div>
      </div>
      <div className={css.checkboxes}>
        <label
          className={`${css.checkbox}`}
          htmlFor="isFullTank"
          key="isFullTank"
        >
          <input
            className={css.checkbox__input}
            type="checkbox"
            name="isFullTank"
            id="isFullTank"
            checked={isFullTank}
            onChange={() => console.log("press checkbox")}
          />
          <div className={css.checkbox__label}>{`Полный бак`}</div>
        </label>
      </div>
    </div>
  );
}

export default OrderListRow;
