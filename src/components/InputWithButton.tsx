import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './chat.css';
import arrow from './images/uparrow.svg'
import { IMessageInputProps } from './types';

const MessageInput = ({ onSend, loading }: IMessageInputProps) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null); 

    useEffect(() => {
        if (!loading && inputRef.current) {
          inputRef.current.focus(); // Устанавливаем фокус на input
        }
      }, [loading]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async () => {
        if (inputValue.trim()) {
            try {
                onSend(inputValue);
                console.log('Submitted:', inputValue);
                setInputValue(''); // очищаем поле после отправки
            } catch (error) {
                console.error('Ошибка при отправке сообщения:', error);
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit(); // отправляем сообщение при нажатии Enter
        }
    };
    console.log('loading----------', loading);

    return (
        <div className="input-container">
            <input
                ref={inputRef}
                disabled={loading}
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={loading ? "Ожидайте ответ" : "Введите сообщение"}
                className="input-field"
            />
            <button
                className={`submit-button ${inputValue.length > 0 ? 'visible' : ''}`}
                onClick={handleSubmit}
                disabled={loading}
            >
                <img src={arrow} alt='arrow' className='submit-button__arrow' />
            </button>
        </div>
    );
};

export default MessageInput;