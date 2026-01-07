import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Welcome to AssistPro!</h2>
          <p>
            Select an existing ticket or click New Ticket to start a new
            conversation...
          </p>
          <Link to="/new-chat" className="card-actions justify-end">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
