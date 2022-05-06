import { useState } from 'react';
import { ReactComponent as RejectSvg } from '../../assets/icons/reject.svg';
import { ReactComponent as EditSvg } from '../../assets/icons/edit.svg';
import css from './DoubleButton.module.scss';
import Modal from '../Modal/Modal';

function DoubleButton({ onChangeButton, onDeleteButton }) {

    const [isOpenModule, setIsOpenModule] = useState(false);

    function handleModuleSubmit() {
        setIsOpenModule(false);
        onDeleteButton();
    }

    function handleModuleCancel() {
        setIsOpenModule(false);
    }

    return (<>
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
                onClick={() => setIsOpenModule(true)}
            >
                <RejectSvg className={css.svg} />
                <span>Удалить</span>
            </button>
        </div>
        <Modal
            title="Подтверждение операции"
            isOpen={isOpenModule}
            onCancel={() => handleModuleCancel()}
            onSubmit={() => handleModuleSubmit()}
        >
            Вы действительно хотите удалить &ldquo;Стоимость тарифа&ldquo; ?
        </Modal>
    </>
    );
}

export default DoubleButton;
