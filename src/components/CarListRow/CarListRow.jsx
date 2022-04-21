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
                <div className={css.details_list}>
                    <div className={css.details_list__row}>
                        {`Марка: ${name}`}
                    </div>
                    <div className={css.details_list__row}>
                        {`Номер: ${number}`}
                    </div>
                    <div className={css.details_list__row}>
                        {`Категория: ${categoryId.name}`}
                    </div>
                </div>
            </div>
            <div className={css.details_list}>
                <div className={css.details_list__row}>
                    {`Цена мин.: ${priceMin}`}
                </div>
                <div className={css.details_list__row}>
                    {`Цена макс.: ${priceMax}`}
                </div>
                <div
                    className={css.details_list__row}
                >{`Топливо: ${tank}`}</div>
                <div
                    className={css.details_list__row}
                >{`Цвета: ${colors}`}</div>
            </div>
            <div className={css.price}>
                <div
                    className={css.details_list__row}
                >{`Описание: ${description}`}</div>
            </div>
            <TripleButton />
        </div>
    );
}

export default CarListRow;
