import { useState } from 'react';
import TripleButton from '../TripleButton/TripleButton';
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
                    <span>Марка: </span>{name}
                </div>
                <div className={css.details_list__row}>
                    <span>Номер: </span>{number}
                </div>
                <div className={css.details_list__row}>
                    <span>Категория: </span>{categoryId.name}
                </div>
            </div>
            <div className={`${css.details_list} ${css.section3}`}>
                <div className={css.details_list__row}>
                    <span>Цена мин.: </span>{priceMin}
                </div>
                <div className={css.details_list__row}>
                    <span>Цена макс.: </span>{priceMax}
                </div>
                <div className={css.details_list__row} >
                    <span>Топливо: </span>{tank ?? 'Нет данных'}</div>
                <div className={css.details_list__row} >
                    <span>Цвета: </span>{colors?.join(', ')}</div>
            </div>
            <div className={`${css.details_list} ${css.section4}`}>
                <div
                    className={css.details_list__row}
                ><span>Описание: </span>{description}</div>
            </div>
            <div className={css.buttons}>
                <TripleButton />
            </div>
        </div>
    );
}

export default CarListRow;
