import Checkbox from "../Checkbox/Checkbox";
import css from "./OrderListRow.module.scss";

function OrderListRow(order) {
    const {
        carId,
        cityId,
        pointId,
        // dateFrom,
        // dateTo,
        color,
        price,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
    } = order;
    console.log(order);
    return (
        <div className={css.container}>
            <div className={css.aboutCar}>
                <div className={css.details_list}>
                    <div className={css.details_list__row}>
                        <span>{carId.name}</span> в <span>{cityId.name}</span>, {pointId.address}
                    </div>
                    <div className={css.details_list__row}>Details</div>
                    <div className={css.details_list__row}>Цвет: <span>{color}</span></div>
                </div>
            </div>
            <div className={css.checkboxes}>
                <Checkbox {...{ checked: isFullTank, label: "Полный бак" }} />
                <Checkbox {...{ checked: isNeedChildChair, label: "Детское кресло" }} />
                <Checkbox {...{ checked: isRightWheel, label: "Правый руль" }} />
            </div>
            <div className={css.price}>{price} ₽</div>
        </div>
    );
}

export default OrderListRow;
