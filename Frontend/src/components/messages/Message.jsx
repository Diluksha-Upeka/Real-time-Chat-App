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
    const bubbleBgColor = fromMe ? "bg-purple-500" : "bg-gray-800";
    
    return (
        <div className={`chat ${chatClassName} flex items-start mb-3`}>
            <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
                    <img alt='User profile' src={profilePic} className="object-cover" />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} p-3 rounded-lg shadow-md`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-50 text-xs ml-2'>{formattedTime}</div>
        </div>
    );
};

export default Message;
