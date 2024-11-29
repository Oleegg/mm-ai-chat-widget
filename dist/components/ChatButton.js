var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import chat from './images/whatsapp-svgrepo-com.svg';
import Chat from "./Chat";
import axios from "axios";
var ChatButton = function (_a) {
    var wrapperButtonStyles = _a.wrapperButtonStyles, wrapperChatStyles = _a.wrapperChatStyles, _b = _a.startChatMessage, startChatMessage = _b === void 0 ? "Здравствуйте! Как я могу помочь вам сегодня?" : _b;
    var _c = useState([]), messages = _c[0], setMessages = _c[1];
    // const [site, setSite] = useState('');
    // const [userName, setUserName] = useState('');
    var site = useRef('');
    var userName = useRef('');
    var _d = useState(false), show = _d[0], setShow = _d[1];
    useEffect(function () {
        var handleBeforeUnload = function (event) {
            axios.post('https://mm-ai.eu/chat-widget/api/chat/', { url: site.current, user: userName.current, message: '', stop: true });
        };
        var handleVisibilityChange = function () {
            if (document.visibilityState === 'hidden') {
                axios.post('https://mm-ai.eu/chat-widget/api/chat/', { url: site.current, user: userName.current, message: '', stop: true });
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        // document.addEventListener('visibilitychange', handleVisibilityChange);
        // Clean up event listeners
        return function () {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            // document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
    useEffect(function () {
        var stopChat = function () { axios.post('https://mm-ai.eu/chat-widget/api/chat/', { url: site.current, user: userName.current, message: '', stop: true }); };
        var url = window.location.href; // Получение полного URL
        console.log("Текущий адрес сайта:", url);
        site.current = url;
        return stopChat;
    }, []);
    var showChat = function () {
        setShow(true);
    };
    var closeChat = function () {
        setShow(false);
        setMessages([]);
        var stopChat = function () { axios.post('https://mm-ai.eu/chat-widget/api/chat/', { url: site.current, user: userName.current, message: '', stop: true }); };
        stopChat();
    };
    console.log('showChat-----', site.current, userName.current);
    var collapseChat = function () { return setShow(false); };
    return (_jsx(_Fragment, { children: show
            ? _jsx(Chat, { site: site, userName: userName, closeChat: closeChat, collapseChat: collapseChat, wrapperChatStyles: wrapperChatStyles, messages: messages, setMessages: setMessages, startChatMessage: startChatMessage })
            :
                _jsx("div", __assign({ className: "chat", style: wrapperButtonStyles, onClick: showChat }, { children: _jsx("button", { children: _jsx("img", { src: chat, alt: "chat", width: 30, height: 30 }) }) })) }));
};
export default ChatButton;
