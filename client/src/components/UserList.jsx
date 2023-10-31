import { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import { IoPersonAdd, IoCheckmarkCircleSharp } from "react-icons/io5";

const ListContainer = ({ children }) => {
  return (
    <div>
      <div className="flex justify-between items-center pt-4 pb-2 text-gray-400">
        <p>User</p>
        <p>Send Invitation</p>
      </div>

      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [userInvited, setUserInvited] = useState(false);

  const handleSelected = () => {
    if (userInvited) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setUserInvited((prevInvited) => !prevInvited);
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex justify-center items-center">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p>{user.fullName || user.id}</p>
      </div>
      <button
        className={`${
          userInvited ? "bg-green-600 text-white" : "bg-blue-600 text-white"
        } flex justify-center items-center px-3 py-2 rounded-md gap-2`}
        onClick={handleSelected}
      >
        {userInvited ? <IoCheckmarkCircleSharp /> : <IoPersonAdd />}
        {userInvited ? "Added" : "Invite"}
      </button>
    </div>
  );
};

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <p>Error has ocurred. Please refresh and try again.</p>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <p>No users found.</p>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        users?.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;
