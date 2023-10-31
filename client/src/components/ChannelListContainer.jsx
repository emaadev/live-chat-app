import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, ChatList, ChatPreview } from "./";

import { AiOutlineWechat } from "react-icons/ai";
import { IoIosSettings } from "react-icons/io";
import { ImExit } from "react-icons/im";

const cookies = new Cookies();

const ChannelListContainer = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("userName");
    cookies.remove("fullName");
    cookies.remove("avatarUrl");
    cookies.remove("email");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  return (
    <aside className="bg-blue-900 text-white flex flex-col justify-between items-start min-w-[350px] w-[400px] h-screen">
      <div className="ml-[20px] my-[15px] gap-[5px] flex flex-col justify-center items-start">
        <a className="flex justify-center items-center gap-[10px]" href="./">
          <AiOutlineWechat className="w-[45px] h-[45px]" />
          <h1 className="text-[40px] font-bold">ChatApp</h1>
        </a>
        <div>
          <p className="text-[16px] text-gray-200">
            Welcome to ChatApp, your messaging solution!
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start w-full h-full">
        <button className="bg-blue-600 w-full flex justify-starts items-center gap-2 text-left pl-[20px] h-[40px]">
          {/* TODO: Create settings */}
          <IoIosSettings className="w-[20px] h-[20px]" /> Settings
        </button>

        <ChannelSearch />

        <div className="flex flex-col w-full">
          <ChannelList
            filters={{}}
            channelRenderFilterFn={() => {}}
            List={(listProps) => (
              <ChatList
                {...listProps}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                type="team"
              />
            )}
            Preview={(previewProps) => (
              <ChatPreview
                {...previewProps}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                type="team"
              />
            )}
          />

          <ChannelList
            filters={{}}
            channelRenderFilterFn={() => {}}
            List={(listProps) => (
              <ChatList
                {...listProps}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                type="messaging"
              />
            )}
            Preview={(previewProps) => (
              <ChatPreview
                {...previewProps}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                type="messaging"
              />
            )}
          />
        </div>
      </div>

      <div className="w-full flex justify-end items-end">
        <div className="flex justify-end items-end mr-4 mb-4">
          <button onClick={logout}>
            <ImExit className="w-[25px] h-[25px]" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ChannelListContainer;
