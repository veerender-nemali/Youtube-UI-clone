// import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils/constants";

const Subscribed = () => {
  const subscribedChannels = useSelector(
    (store) => store.subscribe.subscribedChannels
  );
  // console.log(subscribedChannels);
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);

  return subscribedChannels.length === 0 ? (
    <h1
      className={` pt-5 text-center w-full sm:text-lg ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      }`}
    >
      Subscribe to get the latest videos from channels that you love.
    </h1>
  ) : (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full px-2 sm:px-5 ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      }`}
    >
      {subscribedChannels.map((channel, index) => (
        <Link key={index} to={`/channel/${channel.id}`}>
          <div className="flex p-2 m-1 border border-gray-300 rounded-md items-center ">
            <img
              src={channel.snippet.thumbnails.default.url}
              alt="channel profile fic"
              className="rounded-full w-11 sm:w-16"
            />
            <div className="ml-5">
              <h1 className="font-bold hover:underline cursor-pointer line-clamp-1">
                {channel.snippet.title}
              </h1>
              <h1 className="line-clamp-1">
                {formatNumber(channel.statistics.subscriberCount)} subscribers
              </h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Subscribed;
