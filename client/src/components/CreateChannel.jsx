import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { UserList } from "./";

import { ImCross } from "react-icons/im";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();

    setChannelName(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <p className="text-[16px] mb-1">Insert a Name</p>

      <input
        className="bg-gray-100 placeholder:text-[14px] text-[14px] border-[1px] rounded-md p-2 mb-5"
        type="text"
        value={channelName}
        onChange={handleChange}
        placeholder="Channel Name"
      />

      <div className="text-[16px] border-b-[1px] w-full border-gray-300 pb-2">
        <p>Added Members</p>
      </div>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const [channelName, setChannelName] = useState("");

  return (
    <div className="flex flex-col w-full p-6">
      <div className="flex justify-between items-center border-b-[1px] w-full border-gray-300 pb-2 mb-5">
        <p className="text-[20px] font-semibold">
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <button className="text-red-500" onClick={() => setIsCreating(false)}>
          <ImCross />
        </button>
      </div>

      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}

      <UserList />
    </div>
  );
};

export default CreateChannel;
