import DoubleButton from '../DoubleButton/DoubleButton';
import css from './StandardListRow.module.scss';

function StandardListRow({ row, rowTitles = [], isTitle = false }) {
    const incommingArray = [...row];
    const containerClassName = `${css.container} ${
        isTitle ? css.container_title : ''
    }`;
    const rowClassName = `${css.details_list} ${isTitle ? css.title : ''}`;
    return (
        <div className={containerClassName}>
            {incommingArray.map((rowItem, index) => (
                <div className={rowClassName}>
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
            <div className={css.buttons}>{!isTitle && <DoubleButton />}</div>
        </div>
    );
}

export default StandardListRow;
