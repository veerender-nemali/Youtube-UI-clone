import { useEffect, useState } from "react";
import userLogo from "../../assets/user.svg";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearMessages } from "../utils/slices/chatSlice";
import { generateRandomName } from "../utils/helper";

const LiveChat = () => {
  const [enteredMessage, setEnteredMessage] = useState("");
  const dispatch = useDispatch();
  const chatData = useSelector((store) => store.chat.messages);

  useEffect(() => {
    //API pooling

    const interval = setInterval(() => {
      //   console.log("hii");
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: "Lorem ipsum dolor sit amet...",
        })
      );
    }, 500);

    return () => {
      clearInterval(interval);
      dispatch(clearMessages());
    };
  }, []);

  return (
    <div className="h-[550px] mb-1 w-full ">
      <div className="h-[470px]  mb-1 w-96 border border-gray-600 overflow-y-scroll flex flex-col-reverse">
        {chatData.map((data, index) => (
          <div className="flex pt-1" key={index}>
            <img src={userLogo} alt="UserLogo" className="h-10 p-1" />
            <span className="pr-1 pt-2 font-bold">{data.name}</span>
            <span className="pt-2">{data.message}</span>
          </div>
        ))}
      </div>
      <form
        className="flex w-96 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (enteredMessage === "") {
            return;
          }
          dispatch(
            addMessage({
              name: "veerender",
              message: enteredMessage,
            })
          );
          setEnteredMessage("");
        }}
      >
        <input
          type="text"
          className="p-1 mr-2 w-72 bg-gray-100 outline-none border border-gray-400"
          placeholder={"comment..."}
          value={enteredMessage}
          onChange={(e) => {
            setEnteredMessage(e.target.value);
          }}
        />
        <button className="ml-1 bg-black px-6 rounded-full text-white">
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
