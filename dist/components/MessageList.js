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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import './chat.css';
import { ChatUsers } from './types';
var MessageList = function (_a) {
    var messages = _a.messages, loading = _a.loading;
    var messagesEndRef = useRef(null);
    var scrollToBottom = function () {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    // Используем useEffect для прокрутки при обновлении сообщений
    useEffect(function () {
        scrollToBottom();
    }, [messages]);
    return (_jsxs("ul", __assign({ className: "message-list" }, { children: [messages.map(function (_a, index) {
                var message = _a.message, user = _a.user;
                if (user !== ChatUsers.Bot && user !== ChatUsers.Typing) {
                    return _jsx("li", __assign({ className: 'message user' }, { children: message }), index);
                }
                else {
                    return _jsx("li", __assign({ className: 'message gpt', style: loading && index === messages.length - 1 ? { background: 'none' } : {} }, { children: message }), index);
                }
            }), _jsx("div", { ref: messagesEndRef })] })));
};
export default MessageList;
