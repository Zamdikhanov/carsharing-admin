import { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import TripleButton from '../TripleButton/TripleButton';
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
    } = order;
    const [hasImageError, setHasImageError] = useState(false);
    console.log('order', order);
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
                                : carId?.thumbnail?.path
                        }
                        alt={carId?.name}
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
                <Checkbox {...{ checked: isFullTank, label: 'Полный бак' }} />
                <Checkbox
                    {...{ checked: isNeedChildChair, label: 'Детское кресло' }}
                />
                <Checkbox
                    {...{ checked: isRightWheel, label: 'Правый руль' }}
                />
            </div>
            <div className={css.price}>
                {Intl.NumberFormat('ru', { useGrouping: true }).format(
                    price || noDataMessage,
                )}{' '}
                ₽
            </div>
            <TripleButton />
        </div>
    );
}

export default OrderListRow;
