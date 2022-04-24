import { useState } from 'react';
import DoubleButton from '../DoubleButton/DoubleButton';
import carStubPicture from '../../assets/images/car-stub-picture.png';
import css from './CarListRow.module.scss';

function CarListRow(car) {
    const {
        name,
        priceMax,
        priceMin,
        thumbnail,
        description,
        categoryId,
        number,
        tank,
        colors,
        // id,
    } = car;
    const [hasError, setHasError] = useState(false);

    return (
        <div className={css.container}>
            <div className={css.aboutCar}>
                <div className={css.imageContainer}>
                    <img
                        onError={() => setHasError(true)}
                        className={css.carImage}
                        src={hasError ? carStubPicture : thumbnail.path}
                        alt={name}
                    />
                </div>
            </div>
            <div className={css.details_list}>
                <div className={css.details_list__row}>
                    Марка: <span>{name}</span>
                </div>
                <div className={css.details_list__row}>
                    Номер: <span>{number}</span>
                </div>
                <div className={css.details_list__row}>
                    Категория: <span>{categoryId.name}</span>
                </div>
            </div>
            <div className={`${css.details_list} ${css.section3}`}>
                <div className={css.details_list__row}>
                    Цена мин.: <span>{priceMin}</span> ₽
                </div>
                <div className={css.details_list__row}>
                    Цена макс.: <span>{priceMax}</span> ₽
                </div>
                <div className={css.details_list__row}>
                    Топливо: <span>{tank ?? 'Нет данных'}</span>
                </div>
                <div className={css.details_list__row}>
                    Цвета: <span>{colors?.join(', ')}</span>
                </div>
            </div>
            <div className={`${css.details_list} ${css.section4}`}>
                <div className={css.details_list__row}>
                    Описание: <span>{description}</span>
                </div>
            </div>
            <div className={css.buttons}>
                <DoubleButton />
            </div>
        </div>
    );
}

export default CarListRow;
