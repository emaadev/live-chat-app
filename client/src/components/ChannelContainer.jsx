import { Channel, useChatContext, MessageSimple } from "stream-chat-react";
import { ChannelInner, CreateChannel, EditChannel } from "./";

// TODO: Apply different styles
// import "./ChannelContainer.css"

const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  const { channel } = useChatContext();

  if (isCreating) {
    return (
      <div className="flex w-full">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => {
    <div>
      <p>This is the beginning of your chat history.</p>
      <p>Send messages, attachments, links, emojis and more!</p>
    </div>;
  };

  return (
    <div className="w-full">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => {
          return (
            <div className="message-content pr-[30px] lg:pr-[60px]">
              <MessageSimple key={i} {...messageProps} />
            </div>
          );
        }}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
