import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { ResultsDropdown } from "./";

import { BsSearch } from "react-icons/bs";

const ChannelSearch = () => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const getChannels = async (text) => {
    try {
      const channelsResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID] },
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([
        channelsResponse,
        userResponse,
      ]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      setQuery("");
      console.log(error);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();

    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  const setChannel = (channel) => {
    setQuery("");
    setActiveChannel(channel);
  };

  return (
    <div className="flex justify-center items-center mx-auto my-2 w-[95%] bg-gray-200 rounded-[7px] px-2 ">
      <div className="flex items-center w-full py-2 px-2 gap-3">
        <BsSearch className="fill-gray-400 w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full h-full text-gray-700"
          value={query}
          onChange={onSearch}
        />
      </div>

      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
