import { CSSProperties, Dispatch, MutableRefObject, SetStateAction } from "react";
export declare enum ChatUsers {
    Bot = "bot",
    Typing = "typing"
}
export interface IChatButtonProps {
    wrapperButtonStyles?: CSSProperties;
    wrapperChatStyles?: CSSProperties;
    startChatMessage?: string;
}
export interface IMessage {
    user: string;
    message: string | any;
}
export interface IChatWindowProps {
    messages: IMessage[];
    onSend: (message: string) => void;
    closeChat: () => void;
    collapseChat: () => void;
    loading: boolean;
    wrapperChatStyles?: CSSProperties;
}
export interface IChatProps {
    site: MutableRefObject<string>;
    userName: MutableRefObject<string>;
    closeChat: () => void;
    collapseChat: () => void;
    setMessages: Dispatch<SetStateAction<IMessage[]>>;
    messages: IMessage[];
    wrapperChatStyles?: CSSProperties;
    startChatMessage?: string;
}
export interface IMessageListProps {
    messages: IMessage[];
    loading: boolean;
}
export interface IMessageInputProps {
    onSend: (s: string) => void;
    loading: boolean;
}
export interface IUserMessage {
    user: string;
    url: string;
    message: string;
    stop: boolean;
}
