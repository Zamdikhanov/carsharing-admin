import { ReactComponent as ApproveSvg } from '../../assets/icons/approve.svg';
import { ReactComponent as RejectSvg } from '../../assets/icons/reject.svg';
import { ReactComponent as EditSvg } from '../../assets/icons/edit.svg';
import css from './TripleButton.module.scss';

function TripleButton() {
    return (
        <div className={css.container}>
            <button className={css.button} type="button">
                <ApproveSvg className={css.svg} />
                Готово
            </button>
            <button className={css.button} type="button">
                <RejectSvg className={css.svg} />
                Отмена
            </button>
            <button className={css.button} type="button">
                <EditSvg className={css.svg} />
                Изменить
            </button>
        </div>
    );
}

export default TripleButton;
