import TripleButton from '../TripleButton/TripleButton';
import css from './StandardListRow.module.scss';

function StandardListRow({ row, isTitle = false }) {
    const incommingArray = [...row];
    const containerClassName = `${css.container} ${
        isTitle ? css.container_title : ''
    }`;
    const rowClassName = `${css.details_list} ${isTitle ? css.title : ''}`;
    return (
        <div className={containerClassName}>
            {incommingArray.map((rowItem) => (
                <div className={rowClassName}>
                    <span>{rowItem}</span>
                </div>
            ))}
            <div className={css.buttons}>{!isTitle && <TripleButton />}</div>
        </div>
    );
}

export default StandardListRow;
