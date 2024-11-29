// src/components/ChatWindow.tsx
import { useState } from 'react';
import './chat.css';
import minus from './images/minus.svg';
import x from './images/x.svg';
import MessageList from './MessageList';
import MessageInput from './InputWithButton';
import { IChatWindowProps } from './types';

const ChatWindow = ({ messages, onSend, closeChat, collapseChat,loading, wrapperChatStyles }: IChatWindowProps) => {
    const [close, setClose] = useState(false)

    const closeChatHandler = () => {
        setClose(true)
        setTimeout(() => { closeChat() }, 500)
    }

    const collapseChatHandler = () => {
        setClose(true)
        setTimeout(() => { collapseChat() }, 500)
    }
    return (
        <div className={close ? 'close-window' : 'chat-container'} style={wrapperChatStyles}>
            <div className="chat-header">
                <img className="chat-avatar" src="https://cm4-production-assets.s3.amazonaws.com/1713053696833-1chill.png" alt="Avatar" width={40} height={40} />
                <span className="chat-title">M&M AI</span>
                <button className="btn chat-minimize-button" onClick={collapseChatHandler}><img src={minus} alt="-" /></button>
                <button className="btn chat-close-button" onClick={closeChatHandler}><img src={x} alt="x" /></button>
            </div>
            <div className='chat-content'>
                <MessageList messages={messages} loading={loading} />
                <MessageInput onSend={onSend} loading={loading} />
            </div>
        </div>
    );
};

export default ChatWindow;