import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DoubleButton from '../DoubleButton/DoubleButton';
import carStubPicture from '../../assets/images/car-stub-picture.png';
import css from './CarListRow.module.scss';
import entityApi from '../../api/entityApi';
import { setManualRerender } from '../../store/appSlice';

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
        id,
    } = car;

    const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onChangeButton() {
        navigate(`edit?id=${id}`);
    }

    async function onDeleteButton() {
        await entityApi.deleteEntity({ entity: 'car', id });
        setTimeout(dispatch(setManualRerender()), 0);
    }

    const containerClassName = `${css.container} ${isTitle ? css.container_title : ''
        }`;

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
                {isTitle ? null : (
                    <DoubleButton
                        onChangeButton={() => onChangeButton()}
                        onDeleteButton={() => onDeleteButton()}
                    />
                )}
            </div>
        </div>
    );
}

export default CarListRow;
