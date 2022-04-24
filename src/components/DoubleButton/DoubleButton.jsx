import { ReactComponent as RejectSvg } from '../../assets/icons/reject.svg';
import { ReactComponent as EditSvg } from '../../assets/icons/edit.svg';
import css from './DoubleButton.module.scss';

function DoubleButton() {
    return (
        <div className={css.container}>
            <button className={css.button} type="button">
                <EditSvg className={css.svg} />
                <span>Изменить</span>
            </button>
            <button className={css.button} type="button">
                <RejectSvg className={css.svg} />
                <span>Удалить</span>
            </button>
        </div>
    );
}

export default DoubleButton;
