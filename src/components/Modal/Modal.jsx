import { ReactComponent as Logo } from '../../assets/logo.svg';
import css from './Modal.module.scss';

function Modal({
    title = 'Modal title',
    isOpen = false,
    onCancel = () => { },
    onSubmit = () => { },
    children = null,
}) {

    return (
        <>
            {isOpen && (
                <div className={css.modal_overlay}>
                    <div className={css.modal_window}>
                        <div className={css.modal_header}>
                            <Logo className={css.modal__logo} />
                            <div className={css.modal_title}>{title}</div>
                        </div>
                        <div className={css.modal_body}>
                            {children}
                        </div>
                        <div className={css.modal_footer}>
                            <button className={css.button_secondary} type="button" onClick={onCancel}>Отменить</button>
                            <button className={css.button} type="button" onClick={onSubmit}>Подтвердить</button>
                        </div>
                    </div>
                </div>
            )
            }
            <> <div style={{ display: 'none' }}>Do not show</div></>
        </>
    );
};

export default Modal;