import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    return (
        <form className='px-4 my-3 bg-gray-800 rounded-lg shadow-md' onSubmit={handleSubmit}>
            <div className='flex items-center'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='ml-2 flex items-center'>
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend className='text-purple-500' />}
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
