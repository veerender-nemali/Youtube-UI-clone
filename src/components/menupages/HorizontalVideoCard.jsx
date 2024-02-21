// import React from 'react'
import { useDispatch } from "react-redux";
import { formatNumber } from "../utils/constants";
import { setVideoHistory } from "../utils/slices/historySlice";

const HorizontalVideoCard = ({ video }) => {
  // console.log(video);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="flex flex-row gap-2 "
        onClick={() => {
          dispatch(setVideoHistory(video));
        }}
      >
        <div className=" flex-grow-0  flex">
          <div className="aspect-video min-w-[7.5rem] max-w-[12rem]  w-[calc(60px+17vw)]">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt="video img"
              className=" w-full rounded-md object-contain"
            />
          </div>
        </div>
        <div className="flex-grow-0 flex flex-col">
          <h1 className="font-bold text-xs sm:text-sm md:text-base cursor-pointer line-clamp-2">
            {video.snippet.title}
          </h1>
          <h1 className="hover:underline text-xs sm:text-sm pt-1 line-clamp-1 cursor-pointer">
            {video.snippet.channelTitle}
          </h1>
          <h1 className="text-xs sm:text-sm">
            {video.statistics !== undefined
              ? formatNumber(video.statistics?.viewCount) + " views"
              : ""}
          </h1>
        </div>
      </div>
      {/* <div className="h-[1px] bg-gray-200"></div> */}
    </>
  );
};

export default HorizontalVideoCard;
