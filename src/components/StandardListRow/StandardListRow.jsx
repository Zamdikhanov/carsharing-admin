import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import entityApi from '../../api/entityApi';
import { setManualRerender } from '../../store/appSlice';
import DoubleButton from '../DoubleButton/DoubleButton';
import css from './StandardListRow.module.scss';

function StandardListRow({
    id,
    row,
    entityName,
    rowTitles = [1, 2, 3, 4, 5],
    isTitle = false,
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const incommingArray = [...row];
    const containerClassName = `${css.container} ${
        isTitle ? css.container_title : ''
    }`;
    const rowClassName = `${css.details_list} ${isTitle ? css.title : ''}`;

    function onChangeButton() {
        navigate(`edit?id=${id}`);
    }

    async function onDeleteButton() {
        await entityApi.deleteEntity({ entity: entityName, id });
        setTimeout(dispatch(setManualRerender()), 100);
    }

    return (
        <div className={containerClassName}>
            {incommingArray.map((rowItem, index) => (
                <div className={rowClassName} key={rowTitles[index]}>
                    {rowItem ? (
                        <>
                            <div className={css.rowTitles}>
                                {rowTitles[index]}
                            </div>{' '}
                            <span>{rowItem}</span>
                        </>
                    ) : (
                        <>
                            <div className={css.rowTitles}>
                                {rowTitles[index]}
                            </div>
                            нет данных
                        </>
                    )}
                </div>
            ))}
            <div className={css.buttons}>
                {!isTitle && (
                    <DoubleButton
                        onChangeButton={() => onChangeButton()}
                        onDeleteButton={() => onDeleteButton()}
                    />
                )}
            </div>
        </div>
    );
}

export default StandardListRow;
