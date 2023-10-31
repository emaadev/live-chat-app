import {
  ChannelContainer,
  ChannelListContainer,
  Auth,
} from "./components/index";
import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useState } from "react";

import "./App.css";
import "./components/ChannelListContainer.css";
import "stream-chat-react/dist/css/index.css";

const cookies = new Cookies();

const API_KEY = "d2q8hx6q8zxn";
const authToken = cookies.get("token");
const client = StreamChat.getInstance(API_KEY);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("userName"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarUrl"),
      email: cookies.get("email"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken,
  );
}

function App() {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;

  return (
    <main className="">
      <section className="flex">
        <Chat client={client} theme="team light">
          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />

          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
          />
        </Chat>
      </section>
    </main>
  );
}

export default App;
