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
    const [hasError, setHasError] = useState(false);

    return (
        <div className={css.container}>
            <div className={css.aboutCar}>
                <div className={css.imageContainer}>
                    <img
                        onError={() => setHasError(true)}
                        className={css.carImage}
                        src={hasError ? carStubPicture : carId.thumbnail.path}
                        alt={carId.name}
                    />
                </div>
                <div className={css.details_list}>
                    <div className={css.details_list__row}>
                        <span>{carId.name}</span> в <span>{cityId.name}</span>,{' '}
                        {pointId.address}
                    </div>
                    <div className={css.details_list__row}>
                        {`${formatDate(dateFrom)} - ${formatDate(dateTo)}`}
                    </div>
                    <div className={css.details_list__row}>
                        Цвет: <span>{color}</span>
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
                {Intl.NumberFormat('ru', { useGrouping: true }).format(price)} ₽
            </div>
            <TripleButton />
        </div>
    );
}

export default OrderListRow;
