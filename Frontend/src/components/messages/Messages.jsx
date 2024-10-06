import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeletons";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto bg-gray-900 rounded-b-lg'>
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            ))}
            {!loading && messages.length === 0 && (
                <p className='text-center text-gray-300 py-4'>Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Messages;
