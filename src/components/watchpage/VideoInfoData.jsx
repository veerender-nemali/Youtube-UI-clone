// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import CommentsSection from "./CommentsSection";
import { useSelector } from "react-redux";
import VideoMetaData from "./VideoMetaData";
import ReactPlayer from "react-player";

const VideoInfoData = ({ videoData, channelInfo, comments }) => {
  const screenSize = useSelector((store) => store.screenSize);

  return (
    <div className={`min-w-[235px] ${screenSize.width >= 900 && "col-span-2"}`}>
      <div className="aspect-video ">
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=" + videoData.id}
          controls
          playing
          width="100%"
          height="100%"
        />
      </div>

      <VideoMetaData
        videoDescriptionData={videoData}
        channelInfo={channelInfo}
      />
      {screenSize.width >= 900 && (
        <CommentsSection
          videoStats={videoData.statistics}
          commentsData={comments}
        />
      )}
    </div>
  );
};

export default VideoInfoData;
