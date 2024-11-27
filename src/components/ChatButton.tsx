import React, { useState } from "react"
import chat from './images/whatsapp-svgrepo-com.svg'
import Chat from "./Chat"

const ChatButton = () =>{
    const [show,setShow] = useState(false)
    const showChat = () =>{
      console.log('showChat-----');
      setShow(true)    
    }
    const closeChat = () => setShow(false)
    return (
        <>
        {show ? <Chat close={closeChat} />: 
        <div className="chat" onClick={showChat}>
          <button><img src={chat} alt="chat" width={30} height={30} /></button>
        </div>}
        </>
    )
}
export default ChatButton

