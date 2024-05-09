import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { addFriendChat, sendMessage } from "../../store/reducers/chatReducer";
import { GrChatOption } from "react-icons/gr";
import toast from "react-hot-toast";
const socket = io("http://localhost:5000");

const Chat = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.customerAuth);
  const { currentFriend, myFriends, friendMessages } = useSelector(
    (state) => state.chat
  );
  const [message, setMessage] = useState("");
  const { sellerId } = useParams();

  useEffect(() => {
    socket.emit("addUser", userInfo.id, userInfo);
  }, [userInfo]);

  useEffect(() => {
    dispatch(
      addFriendChat({
        sellerId: sellerId || "",
        userId: userInfo.id,
      })
    );
  }, [dispatch, sellerId, userInfo]);

  const handleSendMessage = () => {
    if (message) {
      dispatch(
        sendMessage({
          userId: userInfo.id,
          message,
          sellerId,
          name: userInfo.name,
        })
      );
      setMessage("");
    } else {
      toast.error("Enter your message");
      return;
    }
  };

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="w-full flex">
        <div className="w-[230px]">
          <div className="flex justify-start gap-3 items-center px-2 text-slate-600 text-xl h-[30px] my-2">
            <span>
              <GrChatOption size={24} />
            </span>
            <span>Message</span>
          </div>
          <ul className="w-full flex flex-col items-start justify-start text-slate-600 gap-1 h-[400px] pr-2 border-r right-2">
            {myFriends.map((friend, ind) => (
              <li
                key={ind}
                className="flex hover:bg-slate-300  flex-row justify-start items-center py-1 border-b bottom-1 w-full"
              >
                <Link
                  to={`/dashboard/chat/${friend.fdId}`}
                  className={`flex gap-2 flex-row active:bg-slate-300 justify-start items-center pl-2`}
                >
                  <div className="relative">
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                    <div className="w-[35px] h-[35px] border-black">
                      <img
                        src={friend.image}
                        alt=""
                        className=" object-cover rounded-full shadow-lg w-[35px] h-[35px]"
                      />
                    </div>
                  </div>
                  <span>{friend.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[calc(100%-230px)]">
          {currentFriend ? (
            <div className="w-full h-full">
              <div className="flex justify-between  bg-slate-200 items-center text-slate-600 text-xl h-[40px] px-2">
                <span>{currentFriend.name}</span>
                <div className="w-[38px] h-[38px]  border-black">
                  <img
                    src={currentFriend.image}
                    className=" object-cover rounded-full shadow-lg w-[38px] h-[38px]"
                    alt=""
                  />
                </div>
              </div>
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {friendMessages?.map((m, i) => {
                    if (currentFriend?.fdId !== m.receiverId) {
                      return (
                        <div
                          key={i}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] "
                            src="http://localhost:3000/images/user.png"
                            alt=""
                          />
                          <div className="p-2 bg-purple-500 text-white rounded-md">
                            <span>{m?.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                           <div className="flex justify-center items-start flex-col bg-blue-300 text-[#333] py-1 px-2 rounded-tl-full rounded-bl-full rounded-tr-full ">
                            <span>{m?.message}</span>
                          </div>
                          <img
                            className="w-[30px] h-[30px] "
                            src="http://localhost:3000/images/user.png"
                            alt=""
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    className="w-full rounded-full h-full outline-none p-3"
                  />
                  <div className="text-2xl right-2 top-2 absolute cursor-auto">
                    <span>
                      <GrEmoji />
                    </span>
                  </div>
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                  <button
                    onClick={handleSendMessage}
                    className="text-2xl cursor-pointer"
                  >
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-lg ont-bold text-slate-600">
              <span>Select Seller to Chat</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
