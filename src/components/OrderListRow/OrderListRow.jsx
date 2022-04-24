import { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import DoubleButton from '../DoubleButton/DoubleButton';
import carStubPicture from '../../assets/images/car-stub-picture.png';
import css from './OrderListRow.module.scss';
import formatDate from '../../utils/formatDate';

function OrderListRow(order) {
    const {
        carId,
        cityId,
        pointId,
        dateFrom,
        dateTo,
        color,
        price,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
        id,
    } = order;
    const [hasImageError, setHasImageError] = useState(false);

    const noDataMessage = 'нет данных';

    return (
        <div className={css.container}>
            <div className={css.aboutCar}>
                <div className={css.imageContainer}>
                    <img
                        onError={() => setHasImageError(true)}
                        className={css.carImage}
                        src={
                            hasImageError
                                ? carStubPicture
                                : carId?.thumbnail?.path || carStubPicture
                        }
                        alt={carId?.name || 'car image'}
                    />
                </div>
                <div className={css.details_list}>
                    <div className={css.details_list__row}>
                        <span>{carId?.name || noDataMessage}</span> в{' '}
                        <span>{cityId?.name || noDataMessage}</span>,{' '}
                        {pointId?.address || noDataMessage}
                    </div>
                    <div className={css.details_list__row}>
                        {`${formatDate(dateFrom || 0)} - ${formatDate(
                            dateTo || 0,
                        )}`}
                    </div>
                    <div className={css.details_list__row}>
                        Цвет: <span>{color || noDataMessage}</span>
                    </div>
                </div>
            </div>
            <div className={css.checkboxes}>
                <Checkbox
                    {...{ id, checked: isFullTank, label: 'Полный бак' }}
                />
                <Checkbox
                    {...{
                        id,
                        checked: isNeedChildChair,
                        label: 'Детское кресло',
                    }}
                />
                <Checkbox
                    {...{ id, checked: isRightWheel, label: 'Правый руль' }}
                />
            </div>
            <div className={css.price}>
                {Intl.NumberFormat('ru', { useGrouping: true }).format(
                    price || noDataMessage,
                )}{' '}
                ₽
            </div>
            <DoubleButton />
        </div>
    );
}

export default OrderListRow;
