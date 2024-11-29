// src/components/Chat.tsx
import { useEffect, useState } from 'react';
import './chat.css';
import ChatWindow from './ChatWindow';
import axios from 'axios';
import TypingIndicator from './typingIndicator';
import { ChatUsers, IChatProps, IMessage, IUserMessage } from './types';

const Chat = ({
    site,
    userName,
    // setUserName,
    closeChat,
    collapseChat,
    messages,
    setMessages,
    wrapperChatStyles,
    startChatMessage
}: IChatProps) => {
    const [userIP, setUserIP] = useState('');   
    const [loading, setLoading] = useState(false);    

    useEffect(() => {
        function getIPFromAmazon() {
            fetch('https://checkip.amazonaws.com/')
                .then((res) => res.text())
                .then((data) => { 
                    console.log(data); 
                    setUserIP(data);
                    userName.current =`${Date.now()}-${data}`;                
                 });
        }
        getIPFromAmazon(); 

        if (!messages.length) {
            const startMessage = [{ user: ChatUsers.Bot, message: startChatMessage }]
            setMessages(startMessage)
        }
    }, [])

    const sendMessage = async (message: string): Promise<any> => {
        const newUserMessage: IUserMessage = {url: site.current, user: userName.current, message, stop: false }
        // const newUserMessages = [...messages, newUserMessage]
        
        try {
            setLoading(true)
            const newMessages = [...messages, newUserMessage, { user: ChatUsers.Typing, message: <TypingIndicator /> }]
            setMessages(newMessages)
            console.log(messages);

            const response = await axios.post('https://mm-ai.eu/chat-widget/api/chat/', newUserMessage); //sisteroom || test   

            
            if (response.status === 200) {
                setLoading(false)
                console.log('sendMessage===================', response);
                if (response.data) {
                    const newMessages = [...messages, newUserMessage, { user: ChatUsers.Bot, message: response.data.message }]
                    setMessages(newMessages)
                } else {
                    const newMessages = [...messages, newUserMessage, { user: ChatUsers.Bot, message: "Извините, чат временно не доступен. Вы можете оставить свои контакты и мы свяжемся с вами в ближайшее время" }]
                    setMessages(newMessages)
                }
            }else{
                setLoading(false)
            }
        } catch (error) {
            return [];
        }
    }

    console.log('messages_______', messages);
    return (
        <ChatWindow
            messages={messages}
            onSend={sendMessage}
            closeChat={closeChat}
            collapseChat={collapseChat}
            loading={loading}
            wrapperChatStyles={wrapperChatStyles}
        />
    );
};

export default Chat;