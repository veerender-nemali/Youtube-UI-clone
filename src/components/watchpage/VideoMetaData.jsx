import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLikedVideos,
  setLikedVideoIds,
  removeLikedVideo,
  setDislikedVideoIds,
  removeDislikedVideoId,
} from "../utils/slices/LikedVideosSlice";
import { formatNumber, formattedTimeAgo } from "../utils/constants";
import {
  setSubscribedChannels,
  unSubcribe,
} from "../utils/slices/subscribeSlice";
import Modal from "../Modal";
import { Link } from "react-router-dom";

const VideoMetaData = ({ videoDescriptionData, channelInfo }) => {
  const { snippet, statistics } = videoDescriptionData;
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const screenSize = useSelector((store) => store.screenSize);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //Liked
  const likedVideoIds = useSelector((store) => store.likedVideos.likedVideoIds);
  const islikedVideoIdExist =
    likedVideoIds.indexOf(videoDescriptionData.id) !== -1;

  //disliked
  const dislikedVideoIds = useSelector(
    (store) => store.likedVideos.dislikedVideoIds
  );
  const isdislikedVideoIdExist =
    dislikedVideoIds.indexOf(videoDescriptionData.id) !== -1;

  //subscribed
  const subscribedChannels = useSelector(
    (store) => store.subscribe.subscribedChannels
  );
  const subscribedIds = subscribedChannels.map((x) => x.id);
  const isChannelIdExist = subscribedIds.indexOf(channelInfo.id) !== -1;

  const expandHandler = () => {
    setExpand(!expand);
  };

  const handleLikes = () => {
    if (!islikedVideoIdExist && isdislikedVideoIdExist) {
      dispatch(removeDislikedVideoId(videoDescriptionData.id));
      dispatch(setLikedVideos(videoDescriptionData));
      dispatch(setLikedVideoIds(videoDescriptionData.id));
    }

    if (!islikedVideoIdExist && !isdislikedVideoIdExist) {
      dispatch(setLikedVideos(videoDescriptionData));
      dispatch(setLikedVideoIds(videoDescriptionData.id));
    }

    if (islikedVideoIdExist) {
      dispatch(removeLikedVideo(videoDescriptionData.id));
    }
  };

  const handleDislikes = () => {
    if (!isdislikedVideoIdExist && islikedVideoIdExist) {
      dispatch(removeLikedVideo(videoDescriptionData.id));
      dispatch(setDislikedVideoIds(videoDescriptionData.id));
    }

    if (!isdislikedVideoIdExist && !islikedVideoIdExist) {
      dispatch(setDislikedVideoIds(videoDescriptionData.id));
    }

    if (isdislikedVideoIdExist) {
      dispatch(removeDislikedVideoId(videoDescriptionData.id));
    }
  };

  const handleSubscribe = () => {
    if (isChannelIdExist) {
      dispatch(unSubcribe(channelInfo.id));
    } else {
      dispatch(setSubscribedChannels(channelInfo));
    }
  };

  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        videoData={videoDescriptionData}
      />
      <h1 className="font-bold text-sm sm:text-base py-1">{snippet?.title}</h1>
      <div className={`flex flex-wrap justify-between gap-4 my-5`}>
        <div className="flex gap-2  items-center font-semibold ">
          <div className=" flex-grow-0  flex">
            <img
              src={channelInfo.snippet.thumbnails.default.url}
              alt="channel Image"
              className="rounded-full w-[calc(17px+7vw)] max-w-[2.7rem]"
            />
          </div>

          <div className="">
            <Link to={`/channel/${channelInfo.id}`}>
              <p className=" line-clamp-1 hover:underline">
                {snippet?.channelTitle}
              </p>
            </Link>

            <p className="whitespace-nowrap">
              {formatNumber(channelInfo.statistics.subscriberCount)} subscribers
            </p>
          </div>
          <button
            className={` ${
              isChannelIdExist
                ? " bg-gray-200 text-black font-semibold"
                : "bg-stone-950 text-white "
            }  md:py-[7px] rounded-full px-4 py-[6px]`}
            onClick={handleSubscribe}
          >
            {isChannelIdExist ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        <div className="flex gap-2 sm:gap-4 flex-wrap sm:flex-nowrap ">
          <button
            className="flex items-center bg-gray-100 rounded-full py-1 px-4"
            onClick={handleLikes}
          >
            <img
              className="h-6 sm:h-7  "
              src={
                islikedVideoIdExist
                  ? "https://api.iconify.design/bx:bxs-like.svg"
                  : "https://api.iconify.design/bx:like.svg"
              }
              alt="like button"
            />

            <span className="border-cyan-200 border-solid pl-1">
              {formatNumber(statistics?.likeCount)}
            </span>
          </button>
          <button
            className="bg-gray-100 rounded-full px-5 py-1"
            onClick={handleDislikes}
          >
            <img
              className="h-6 sm:h-7"
              src={
                isdislikedVideoIdExist
                  ? "https://api.iconify.design/bx:bxs-dislike.svg"
                  : "https://api.iconify.design/bx:dislike.svg"
              }
              alt="dislike button"
            />
          </button>
          <button
            className="flex  items-center bg-gray-100  py-1 rounded-full px-4"
            onClick={openModal}
          >
            <img
              src="https://api.iconify.design/clarity:add-text-line.svg"
              alt="save button"
              className="h-6 sm:h-7"
            />
            <span className="ml-2">save</span>
          </button>
        </div>
      </div>
      <div className="bg-gray-300 rounded-md p-2 mt-1">
        <p>{formattedTimeAgo(snippet?.publishedAt)}</p>
        <p>{formatNumber(statistics?.viewCount)} views</p>
        <p className="">
          {expand
            ? snippet?.description
            : snippet?.description.slice(
                0,
                screenSize.width < 640
                  ? screenSize.width < 350
                    ? 60
                    : 100
                  : 200
              )}
        </p>

        <button onClick={expandHandler} className="mt-2">
          {expand ? "Seeless" : "Seemore..."}
        </button>
      </div>
    </div>
  );
};

export default VideoMetaData;
