import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [load, setLoad] = useState(false);

  const getChannels = async (text) => {
    try {
      // TODO: get channels - fetch
    } catch (error) {
      setQuery("");
      console.log(error);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();

    setLoad(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
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
    </div>
  );
};

export default ChannelSearch;
