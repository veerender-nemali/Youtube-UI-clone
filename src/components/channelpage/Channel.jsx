import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import { key } from "../utils/constants";
import ChannelNavigation from "./ChannelNavigation";
import { useSelector } from "react-redux";

const Channel = () => {
  const [channelInfo, setChannelInfo] = useState();
  const { title } = useParams();
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  // console.log(title.replace(/@/, ""));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${title}&key=${key}`
      );
      const result = await response.json();
      setChannelInfo(result.items[0]);
    };
    fetchData();
  }, [title]);

  return (
    <div className={`w-full p-2 sm:p-4 ${isMenuOpen ? "sm:ml-56" : "sm:mx-3"}`}>
      {channelInfo && (
        <>
          <Details channelInfo={channelInfo} />
          <ChannelNavigation channelInfo={channelInfo} />
        </>
      )}
    </div>
  );
};

export default Channel;
