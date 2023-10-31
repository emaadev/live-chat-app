import { MdAddCircle } from "react-icons/md";

const ChatList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setCreateType,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
}) => {
  if (error) {
    return type === "team" ? (
      <div>
        <p>Connection error, please wait a moment and try again.</p>
      </div>
    ) : null;
  }
  if (loading) {
    return (
      <div>
        <p>{type === "team" ? "Channels" : "Messages"} Loading...</p>
      </div>
    );
  }

  return (
    <div className="">
      <div>
        <p className="text-white font-semibold text-[20px] border-b-[1px] border-gray-300">
          {type === "team" ? "Groups" : "Direct Message"}
        </p>
        <div>
          <button
            onClick={() => {
              setCreateType(type);
              setIsCreating((prevState) => !prevState);
              setIsEditing(false);
              if (setToggleContainer)
                setToggleContainer((prevState) => !prevState);
            }}
            className="flex w-full justify-between items-center bg-gray-800 text-gray-400 hover:text-white py-1 px-3"
          >
            Add Channel
            <MdAddCircle />
          </button>
        </div>
      </div>

      {children}
    </div>
  );
};

export default ChatList;
