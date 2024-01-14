import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";
const LiveChat = () => {
  const [livemessage, setlivemessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20),
        })
      );
    }, 1500);

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100  rounded-lg overflow-y-scroll flex flex-col-reverse ">
        <div>
          {/* Don't use indexes as keys */}
          {chatMessages.map((c, i) => (
            <ChatMessage key={i} name={c.name} message={c.message} />
          ))}
        </div>
      </div>

      <form
        className="w-full p-2 ml-2 border border-black flex"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "akshay saini",
              message: livemessage,
            })
          );
          setlivemessage("");
        }}
      >
        <input
          className=" px-2 w-80"
          type="text"
          value={livemessage}
          onChange={(e) => setlivemessage(e.target.value)}
        />
        <button className="px-2 mx-2 bg-green-100 ">send</button>
      </form>
    </>
  );
};

export default LiveChat;
