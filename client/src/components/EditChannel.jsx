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

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Updating channel name to ${channelName}` }
      );
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  };

  return (
    <div className="w-full flex flex-col justify-between items-end">
      <div className="flex flex-col w-full p-6">
        <div className="flex justify-between items-center border-b-[1px] w-full border-gray-300 pb-2 mb-5">
          <p className="text-[20px] font-semibold">Settings</p>
          <button className="text-red-500" onClick={() => setIsEditing(false)}>
            <ImCross />
          </button>
        </div>

        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />

        <UserList setSelectedUsers={setSelectedUsers} />
      </div>

      <div className="bg-gray-100 w-full flex justify-end items-center p-5">
        <button
          onClick={updateChannel}
          className="bg-blue-600 text-white flex justify-center items-center px-3 py-2 rounded-md gap-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditChannel;
