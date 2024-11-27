import React from 'react';
import { IMessage } from './Chat';
import './MessageList.css'

interface MessageListProps {
    messages: IMessage[];
}

const MessageList = ({ messages }: MessageListProps) => {
    return (
        <ul className="message-list">
            {messages.map(({message, user}, index) => {
                if(user === 'user'){
                    return <li className='message user' key={index}>{message}</li>
                }else{
                    return <li className='message gpt' key={index}>{message}</li>
                }                
            })}
        </ul>
    );
};

export default MessageList;