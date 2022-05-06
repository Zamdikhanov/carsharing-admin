import { ReactComponent as RejectSvg } from '../../assets/icons/reject.svg';
import { ReactComponent as EditSvg } from '../../assets/icons/edit.svg';
import css from './DoubleButton.module.scss';

function DoubleButton({ onChangeButton, onDeleteButton }) {
    function onClickDeleteButton() {
        if (window.confirm('Действительно хотите удалить?')) {
            onDeleteButton();
        }
    }

    return (
        <div className={css.container}>
            <button
                className={css.button}
                type="button"
                onClick={onChangeButton}
            >
                <EditSvg className={css.svg} />
                <span>Изменить</span>
            </button>
            <button
                className={css.button}
                type="button"
                onClick={onClickDeleteButton}
            >
                <RejectSvg className={css.svg} />
                <span>Удалить</span>
            </button>
        </div>
    );
}

export default DoubleButton;
