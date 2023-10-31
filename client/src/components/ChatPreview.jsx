import { Avatar, useChatContext } from "stream-chat-react";

const ChatPreview = ({
  setActiveChannel,
  channel,
  type,
  setIsCreating,
  setIsEditing,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <button className="text-white hover:text-white rounded-md hover:bg-blue-800 w-full text-left p-2">
      # {channel?.data?.name || channel?.data?.id}
    </button>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <button className="text-white hover:bg-blue-800 rounded-md w-full text-left flex justify-start items-center p-2">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </button>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "bg-blue-700 font-semibold rounded-md"
          : ""
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default ChatPreview;
