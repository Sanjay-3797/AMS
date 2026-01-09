import {  useNavigate } from "react-router-dom";
import { newChatForId } from "../api/ClientAPI";
import { useState } from "react";

const LandingPage = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const handleNewChat = async () => {
    try {
      const { success } = await newChatForId();
      if (!success.chat_id) return;
      setChats((prev) => [success.chat_id, ...prev]);
      navigate(`/chat/${success.chat_id}`);
    } catch (err) {
      console.error(err?.message || err);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Welcome to AssistPro!</h2>
          <p>
            Select an existing ticket or click New Ticket to start a new
            conversation...
          </p>

          <button className="btn btn-primary" onClick={handleNewChat}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
