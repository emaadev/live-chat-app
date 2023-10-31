import React, { useState } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";

import "./ChannelInner.css";
import { IoMdSettings } from "react-icons/io";

// import { ChannelInfo } from '../assets';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const { client, channel } = useChatContext();

  const members = Object.values(channel.state.members).filter(
    ({ user }) => user.id !== client.userID
  );

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div className="flex justify-center items-start w-full">
        <Window>
          <div className="flex justify-between items-center pt-6 px-6 pb-4 border-b-[1px]">
            <div className="flex justify-center items-center gap-2">
              {/* <h2 className="text-[20px] font-semibold"># {channel.id}</h2> */}
              <h2 className="text-[20px] font-semibold">
                {channel.type === "team"
                  ? `# ${channel.id}`
                  : `# ${members[0].user.id}`}
              </h2>
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <IoMdSettings />
              </button>
            </div>
            <p className="text-[14px] text-gray-400">
              {channel.data.member_count > 2 &&
                `Users online: ${channel.data.member_count}`}
              {channel.state.watcher_count === 2 ? `Online` : `Disconnected`}
            </p>
          </div>
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

export default ChannelInner;
