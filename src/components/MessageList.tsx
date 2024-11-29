import { useEffect, useRef } from 'react';
import './chat.css'
import { ChatUsers, IMessageListProps } from './types';

const MessageList = ({ messages, loading }: IMessageListProps) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
    
      // Используем useEffect для прокрутки при обновлении сообщений
      useEffect(() => {
        scrollToBottom();
      }, [messages]);

    return (
        <ul className="message-list">
            {messages.map(({message, user}, index) => {                
                if(user !== ChatUsers.Bot && user !== ChatUsers.Typing){
                    return <li className='message user' key={index}>{message}</li>
                }else{
                    return <li className='message gpt' style={loading && index===messages.length -1 ? {background: 'none'}: {}} key={index}>{message}</li>
                }                
            })}
            <div ref={messagesEndRef} />
        </ul>
    );
};

export default MessageList;