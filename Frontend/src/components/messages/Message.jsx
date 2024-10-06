import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-purple-500" : "bg-gray-600"; // Change bubble color for better contrast

    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClassName} flex items-start mb-4`}>
            <div className='chat-image avatar mr-2'>
                <div className='w-10 rounded-full overflow-hidden shadow-lg'>
                    <img alt='User profile' className='object-cover' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white rounded-lg shadow-md p-4 ${bubbleBgColor} ${shakeClass}`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-75 text-xs ml-2'>{formattedTime}</div>
        </div>
    );
};

export default Message;
