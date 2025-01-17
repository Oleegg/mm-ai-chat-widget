var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
// src/components/Chat.tsx
import { useEffect, useState } from 'react';
import './chat.css';
import ChatWindow from './ChatWindow';
import axios from 'axios';
import TypingIndicator from './typingIndicator';
import { ChatUsers } from './types';
var Chat = function (_a) {
    var site = _a.site, userName = _a.userName, 
    // setUserName,
    closeChat = _a.closeChat, collapseChat = _a.collapseChat, messages = _a.messages, setMessages = _a.setMessages, wrapperChatStyles = _a.wrapperChatStyles, startChatMessage = _a.startChatMessage;
    var _b = useState(''), userIP = _b[0], setUserIP = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    useEffect(function () {
        function getIPFromAmazon() {
            fetch('https://checkip.amazonaws.com/')
                .then(function (res) { return res.text(); })
                .then(function (data) {
                console.log(data);
                setUserIP(data);
                userName.current = "".concat(Date.now(), "-").concat(data);
            });
        }
        getIPFromAmazon();
        if (!messages.length) {
            var startMessage = [{ user: ChatUsers.Bot, message: startChatMessage }];
            setMessages(startMessage);
        }
    }, []);
    var sendMessage = function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var newUserMessage, newMessages, response, newMessages_1, newMessages_2, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newUserMessage = { url: site.current, user: userName.current, message: message, stop: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setLoading(true);
                    newMessages = __spreadArray(__spreadArray([], messages, true), [newUserMessage, { user: ChatUsers.Typing, message: _jsx(TypingIndicator, {}) }], false);
                    setMessages(newMessages);
                    console.log(messages);
                    return [4 /*yield*/, axios.post('https://mm-ai.eu/chat-widget/api/chat/', newUserMessage)];
                case 2:
                    response = _a.sent();
                    if (response.status === 200) {
                        setLoading(false);
                        console.log('sendMessage===================', response);
                        if (response.data) {
                            newMessages_1 = __spreadArray(__spreadArray([], messages, true), [newUserMessage, { user: ChatUsers.Bot, message: response.data.message }], false);
                            setMessages(newMessages_1);
                        }
                        else {
                            newMessages_2 = __spreadArray(__spreadArray([], messages, true), [newUserMessage, { user: ChatUsers.Bot, message: "Извините, чат временно не доступен. Вы можете оставить свои контакты и мы свяжемся с вами в ближайшее время" }], false);
                            setMessages(newMessages_2);
                        }
                    }
                    else {
                        setLoading(false);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    console.log('messages_______', messages);
    return (_jsx(ChatWindow, { messages: messages, onSend: sendMessage, closeChat: closeChat, collapseChat: collapseChat, loading: loading, wrapperChatStyles: wrapperChatStyles }));
};
export default Chat;
