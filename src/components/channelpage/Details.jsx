// import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../utils/constants";
import {
  setSubscribedChannels,
  unSubcribe,
} from "../utils/slices/subscribeSlice";

const Details = ({ channelInfo }) => {
  const screenSize = useSelector((store) => store.screenSize);
  const dispatch = useDispatch();
  // console.log(channelInfo);

  const subscribedChannels = useSelector(
    (store) => store.subscribe.subscribedChannels
  );
  const subscribedIds = subscribedChannels.map((x) => x.id);
  const isChannelIdExist = subscribedIds.indexOf(channelInfo.id) !== -1;

  const handleSubscribe = () => {
    if (isChannelIdExist) {
      dispatch(unSubcribe(channelInfo.id));
    } else {
      dispatch(setSubscribedChannels(channelInfo));
    }
  };
  return (
    <div
      className={`flex p-2  ${
        screenSize.width < 640 ? "flex-col justify-center items-center" : ""
      } `}
    >
      <img
        className={` ${
          screenSize.width < 370 ? "w-28 my-2" : "w-36"
        } rounded-full sm:w-40 h-full`}
        src={channelInfo.snippet.thumbnails.medium.url}
        alt="channel banner"
      />
      <div className="px-3 sm:pl-4 text-center sm:text-left">
        <h1 className="font-bold text-3xl">{channelInfo.snippet.title}</h1>
        <h1 className="py-1">{channelInfo.snippet.customUrl}</h1>
        <h1 className="py-1">
          {formatNumber(channelInfo.statistics.subscriberCount)} subscribers
          <span className="pl-2">
            {formatNumber(channelInfo.statistics.videoCount)} videos
          </span>
        </h1>
        {/* <p className="py-1 line-clamp-1">{channelInfo.snippet.description}</p> */}
        <button
          className={` ${
            isChannelIdExist
              ? " bg-gray-200 text-black font-semibold"
              : "bg-stone-950 text-white "
          }  px-5 py-2 rounded-full my-1`}
          onClick={handleSubscribe}
        >
          {isChannelIdExist ? "Subscribed" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default Details;
