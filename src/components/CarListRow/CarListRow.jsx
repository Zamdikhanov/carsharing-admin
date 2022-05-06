import { useState } from 'react';
import DoubleButton from '../DoubleButton/DoubleButton';
import carStubPicture from '../../assets/images/car-stub-picture.png';
import css from './CarListRow.module.scss';

function CarListRow({ car, isTitle = false }) {
    const {
        name,
        priceMin,
        priceMax,
        thumbnail,
        description,
        categoryId,
        number,
        tank,
        colors,
        // id,
    } = car;

    const [hasError, setHasError] = useState(false);

    const containerClassName = `${css.container} ${
        isTitle ? css.container_title : ''
    }`;
    console.log('car ', car);
    console.log(
        'name ',
        name,
        priceMax,
        priceMin,
        thumbnail,
        description,
        categoryId,
        number,
        tank,
        colors,
    );

    return (
        <div className={containerClassName}>
            <div className={css.aboutCar}>
                <div className={css.imageContainer}>
                    {isTitle ? (
                        <div className={css.details_list__row}>
                            <span> &nbsp;&nbsp; Изображение</span>
                        </div>
                    ) : (
                        <img
                            onError={() => setHasError(true)}
                            className={css.carImage}
                            src={hasError ? carStubPicture : thumbnail.path}
                            alt={name}
                        />
                    )}
                </div>
            </div>
            <div className={css.details_list}>
                <div className={css.details_list__row}>
                    <span>{name}</span>
                </div>
                <div className={css.details_list__row}>{number}</div>
            </div>
            <div className={css.details_list}>
                <div className={css.details_list__row}>
                    <span>{categoryId?.name}</span>
                </div>
                <div className={css.details_list__row}>
                    {tank ?? 'Нет данных'}
                </div>
            </div>
            <div className={`${css.details_list} ${css.section3}`}>
                <div className={css.details_list__row}>
                    <span>{priceMin}</span> - <span>{priceMax}</span> ₽
                </div>
                <div className={css.details_list__row}>
                    {colors?.join(', ')}
                </div>
            </div>
            <div className={`${css.details_list} ${css.section4}`}>
                <div className={css.details_list__row}>
                    <span>{description}</span>
                </div>
            </div>
            <div className={css.buttons}>
                {isTitle ? null : <DoubleButton />}
            </div>
        </div>
    );
}

export default CarListRow;
