import { useEffect, useRef, useState } from "react"
import chat from './images/whatsapp-svgrepo-com.svg'
import Chat from "./Chat"
import { IChatButtonProps, IMessage } from "./types";
import axios from "axios";

const ChatButton = ({ wrapperButtonStyles, wrapperChatStyles, startChatMessage = "Здравствуйте! Как я могу помочь вам сегодня?" }: IChatButtonProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const [site, setSite] = useState('');
  // const [userName, setUserName] = useState('');
  const site = useRef('')
  let userName = useRef('')
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      axios.post('https://mm-ai.eu/chat-widget/api/chat/', {url: site.current, user: userName.current, message: '', stop: true })
    };

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          axios.post('https://mm-ai.eu/chat-widget/api/chat/', {url: site.current, user: userName.current, message: '', stop: true })
        }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    // document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up event listeners
    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        // document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
}, []);

  

  useEffect(() => {
    const stopChat = () => {axios.post('https://mm-ai.eu/chat-widget/api/chat/', {url: site.current, user: userName.current, message: '', stop: true })}
    const url = window.location.href; // Получение полного URL
    console.log("Текущий адрес сайта:", url);
    site.current = url;
    

    return stopChat
  }, [])

  const showChat = () => {    
    setShow(true)
  }

  const closeChat = () => {
    setShow(false)
    setMessages([])
    const stopChat = () => {axios.post('https://mm-ai.eu/chat-widget/api/chat/', {url: site.current, user: userName.current, message: '', stop: true })}
    stopChat()
  }
  console.log('showChat-----', site.current, userName.current);
  const collapseChat = () => setShow(false)

  return (
    <>
      {show
        ? <Chat
          site={site}
          userName={userName}
          closeChat={closeChat}
          collapseChat={collapseChat}
          wrapperChatStyles={wrapperChatStyles}
          messages={messages}
          setMessages={setMessages}
          startChatMessage={startChatMessage}
        />
        :
        <div className="chat" style={wrapperButtonStyles} onClick={showChat}>
          <button><img src={chat} alt="chat" width={30} height={30} /></button>
        </div>}
    </>
  )
}
export default ChatButton

