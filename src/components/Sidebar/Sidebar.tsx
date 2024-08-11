import { Link } from "react-router-dom";
import profile from "../../assets/images/profile.jpg";
import Input from "../ui/Input";
import { useQuery } from "react-query";
import { useCallback } from "react";
import { chatInstance } from "@/api/axios";
import updateConversationStore from "../../state/store";

// [
//   {
//       "conversation": {
//           "conversation_id": "b9847985-771c-4cdb-a1d1-92c828c0705d",
//           "participant_ids": [
//               "1d10c190-8c45-448f-9de3-02e19e816ec2",
//               "94f86888-2dff-454d-bd8e-4013106a5531"
//           ],
//           "created_at": "2024-08-10T13:15:55.252Z",
//           "last_message_at": "2024-08-10T13:15:55.252Z"
//       },
//       "recentMessage": {
//           "message_id": "acd6a8d0-571a-11ef-8b48-417708c1e7d5",
//           "sender_id": "94f86888-2dff-454d-bd8e-4013106a5531",
//           "receiver_id": "1d10c190-8c45-448f-9de3-02e19e816ec2",
//           "message": "hii",
//           "created_at": "2024-08-10T13:15:55.283Z"
//       }
//   }
// ]

const Sidebar = () => {

  const {updateConversationId, updateSenderId, updateReceiverId } = updateConversationStore((state)=> state);


  // Memoize the API call to prevent re-creation on every render
  const fetchUserConversations = useCallback(async () => {
    const userId = await localStorage.getItem("userId");
    const response = await chatInstance.get(`chat/user/conversations`, {
      params: { userId },
    });
    return response.data;
  }, []);

  const { isFetching, error, data } = useQuery({
    queryKey: ["userConvo"],
    queryFn: fetchUserConversations,
    staleTime: 60000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });

  const handleConversationDetailds = async (user) => {
    if(user){
      await updateConversationId(user.conversation_id)
      await updateSenderId(user.recentMessage.sender_id)
      await updateReceiverId(user.recentMessage.reciever_id)
    }
  };

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="h-screen bg-primary pr-3 pl-3 w-1/3 border-r-secondary border-r-2 relative">
      <div className="w-full bg-primary  sticky top-0">
        <Input
          className="w-full bg-secondary border-none text-white mb-4 mt-4 text-lg"
          placeholder="search..."
        />
      </div>
      <div className="w-full h-full flex gap-3">
        {/* <p className='text-xl text-white font-semibold flex align-middle'>Chats</p> */}
        {console.log(data.data.length)}
        {!(data.data.length>0)  ? (
          <div className="flex-1 align-middle justify-center">no conversations found ..click here to start one..</div>
        ) : (
          <ul className="w-full">
            {data.data.map((user) => (
              <li className="w-full flex align-top justify-start cursor-pointer items-center gap-4 p-2 border-b-2 border-gray-600 hover:bg-secondary transition duration-200 ease-in-out" onClick={()=> handleConversationDetailds(user)}>
                <div className="flex flex-1 align-middle justify-center">
                  <img
                    className="block h-20 w-20 rounded-full m-auto object-contain"
                    src={profile}
                    alt="candidate-icon"
                  />
                  <div
                    // to="/candidates"
                    className="flex-1 block text-lg font-medium p-4"
                  >
                    <p className="text-lg overflow-hidden text-nowrap text-ellipsis">
                      {user.name}
                    </p>
                    <p className="text-base mt-2 text-gray-400 overflow-hidden text-nowrap text-ellipsis">
                      {user.recentMessage.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center align-middle">
                  <p className="w-full">5:55am</p>
                  <div className="w-full flex justify-center align-middle mt-2 text-sm">
                    <span className="bg-secondary p-2 rounded-full">1</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
