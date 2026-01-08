import React, { useEffect, useState } from "react";
import { DOMAIN_URL } from "../api/config";

const Settings = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllChats = async () => {
    try {
      const response = await fetch(`${DOMAIN_URL}/get_all_chats/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          credentials: "include",
        },
      });

      if (!response.ok) {
        console.log(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  if (loading) {
    return <div className="p-4">Loading chats...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">Error fetching chats: {error}</div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">All Chats</h2>
      <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default Settings;
