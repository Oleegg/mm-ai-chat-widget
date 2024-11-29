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
// src/components/ChatWindow.tsx
import { useState } from 'react';
import './chat.css';
import minus from './images/minus.svg';
import x from './images/x.svg';
import MessageList from './MessageList';
import MessageInput from './InputWithButton';
var ChatWindow = function (_a) {
    var messages = _a.messages, onSend = _a.onSend, closeChat = _a.closeChat, collapseChat = _a.collapseChat, loading = _a.loading, wrapperChatStyles = _a.wrapperChatStyles;
    var _b = useState(false), close = _b[0], setClose = _b[1];
    var closeChatHandler = function () {
        setClose(true);
        setTimeout(function () { closeChat(); }, 500);
    };
    var collapseChatHandler = function () {
        setClose(true);
        setTimeout(function () { collapseChat(); }, 500);
    };
    return (_jsxs("div", __assign({ className: close ? 'close-window' : 'chat-container', style: wrapperChatStyles }, { children: [_jsxs("div", __assign({ className: "chat-header" }, { children: [_jsx("img", { className: "chat-avatar", src: "https://cm4-production-assets.s3.amazonaws.com/1713053696833-1chill.png", alt: "Avatar", width: 40, height: 40 }), _jsx("span", __assign({ className: "chat-title" }, { children: "M&M AI" })), _jsx("button", __assign({ className: "btn chat-minimize-button", onClick: collapseChatHandler }, { children: _jsx("img", { src: minus, alt: "-" }) })), _jsx("button", __assign({ className: "btn chat-close-button", onClick: closeChatHandler }, { children: _jsx("img", { src: x, alt: "x" }) }))] })), _jsxs("div", __assign({ className: 'chat-content' }, { children: [_jsx(MessageList, { messages: messages, loading: loading }), _jsx(MessageInput, { onSend: onSend, loading: loading })] }))] })));
};
export default ChatWindow;
