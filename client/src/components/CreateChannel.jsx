import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { UserList } from "./";

import { ImCross } from "react-icons/im";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const [validInput, setValidInput] = useState(false);

  const handleChange = (e) => {
    let actualValue = e.target.value;
    e.preventDefault();

    // Input Validations
    if (actualValue.toString().toLowerCase().includes(" ")) {
      setValidInput(false);
    }
    if (actualValue.toString().toLowerCase().includes(".")) {
      setValidInput(false);
    } else {
      setValidInput(true);
    }

    setChannelName(actualValue);
  };

  return (
    <div className="flex flex-col">
      <p className="text-[16px] mb-1">Insert a Name</p>

      <div className="flex flex-col w-full">
        <input
          className="bg-gray-100 placeholder:text-[14px] text-[14px] border-[1px] rounded-md p-2 mb-1"
          type="text"
          value={channelName}
          onChange={handleChange}
          placeholder="Channel Name"
        />
        {validInput ? (
          <p className="text-[14px] text-gray-400 mb-5">
            Waiting for a name...
          </p>
        ) : (
          <p className="text-[14px] text-red-400 mb-5">
            The name can't contain: spaces, dots or numbers.
          </p>
        )}
      </div>

      <div className="text-[16px] border-b-[1px] w-full border-gray-300 pb-2">
        <p>Add Users</p>
      </div>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });
      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col justify-between w-full">
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

        <UserList setSelectedUsers={setSelectedUsers} />
      </div>

      <div className="bg-gray-100 flex justify-end items-center p-5">
        <button
          onClick={createChannel}
          className="bg-blue-600 text-white flex justify-center items-center px-3 py-2 rounded-md gap-2"
        >
          {createType === "team" ? "Create Channel" : "Send Message to Group"}
        </button>
      </div>
    </section>
  );
};

export default CreateChannel;
