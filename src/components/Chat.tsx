// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';
import './chat.css';
import ChatWindow from './ChatWindow';
import axios from 'axios';

export interface IMessage {
    user: string;
    message: string
}


const Chat = ({ close }: { close: any }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [user, setUser] = useState('user');

    useEffect(() => {
        function getIPFromAmazon() {
            fetch('https://checkip.amazonaws.com/')
                .then((res) => res.text())
                .then((data) => { console.log(data); setUser(data) });        }
        getIPFromAmazon(); // IP
    }, [])

    const sendMessage = async (message: string): Promise<any> => {
        const m = { user: 'user', message }
        const newMessages = [...messages, m]
        setMessages(newMessages)
        try {
            const response = await axios.post('https://mm-ai.eu/sisteroom/widget/chat/', m); //sisteroom || test   
            console.log('sendMessage===================', response);
            if (response.status === 200) {
                const newMessages = [...messages,m, {user: 'sisteroom', message:  response.data.message }]
                setMessages(newMessages)
                
            } else {
                return []
            }
        } catch (error) {

            return [];
        }
    }    

    return (
        <>
            <ChatWindow
                messages={messages}
                onSend={sendMessage}
                onClose={close}
            />
        </>
    );
};

export default Chat;