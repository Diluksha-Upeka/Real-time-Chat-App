import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className='md:min-w-[450px] flex flex-col bg-gray-800 rounded-lg shadow-lg'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-purple-900 px-5 py-3 flex items-center justify-center rounded-t-lg'>
                        <span className='text-gray-100 font-bold'>{selectedConversation.fullName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full py-10'>
            <div className='px-4 text-center text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName}</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};
