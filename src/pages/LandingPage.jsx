import { useNavigate } from "react-router-dom";
import { newChatForId } from "../api/ClientAPI";
import { useAuth } from "../auth/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { setChats } = useAuth();

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
    <div className="flex h-full items-center justify-center">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title">Welcome to AirBot!</h2>
          <p>
            Select an existing ticket or click New Ticket to start a new
            conversation...
          </p>
          <div className="card-actions justify-end">
            <button className="btn" onClick={handleNewChat}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
