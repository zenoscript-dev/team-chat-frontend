import profile from "../../assets/images/profile.jpg";
import { Outlet } from "react-router-dom";

const ChatHeader = () => {

  return (
    <>
      <div className="h-20 w-full bg-primary shadow-md flex items-center px-8">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full object-cover mr-4"
            src={profile}
            alt="Profile"
          />
          <div className="flex flex-col text-right cursor-pointer">
            <span className="font-bold text-lg">Naresh DJ</span>
            <span className="text-gray-500 text-sm">Recruiter</span>
          </div>
          {/* <img className='w-4 h-4 cursor-pointer ml-2' src={downArrow} alt='Down Arrow' /> */}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ChatHeader;
