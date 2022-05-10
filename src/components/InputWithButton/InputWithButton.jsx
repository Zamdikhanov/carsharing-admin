import { useState } from 'react';
import css from './InputWithButton.module.scss';

function InputWithButton({ label, placeholder, type, onClick }) {
    const [val, setVal] = useState('');

    return (
        <div className={css.input_container}>
            <label>
                <div className={css.label}>{label}</div>
                <div className={css.row}>
                    <input
                        className={css.input}
                        type={type}
                        placeholder={placeholder}
                        autoComplete="off"
                        value={val}
                        onChange={(e) => {
                            setVal(e.target.value);
                        }}
                    />
                    <button
                        className={css.button}
                        type="button"
                        onClick={() => onClick(val, setVal)}
                    >
                        <span>+</span>
                    </button>
                </div>
            </label>
        </div>
    );
}

export default InputWithButton;
