import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
    return (
        <div className='flex flex-col md:flex-row h-full min-h-screen rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 md:p-6'>
            <div className='hidden md:flex md:w-1/4 p-4'>
                <Sidebar />
            </div>
            <div className="flex-1 flex justify-center items-center p-4 md:p-6">
                <div className="flex-1 w-full max-w-2xl p-8 rounded-lg bg-white bg-opacity-10 backdrop-blur-lg shadow-lg">
                    <MessageContainer />
                </div>
            </div>
        </div>
    );
};

export default Home;
