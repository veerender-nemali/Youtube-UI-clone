import { useDispatch } from "react-redux";
import { setVideoHistory } from "../utils/slices/historySlice";
import { formatNumber, formattedTimeAgo } from "../utils/constants";

const VideoCard = ({ videoInfo }) => {
  const { snippet, statistics } = videoInfo;
  const dispatch = useDispatch();

  return (
    <div
      className=" rounded-lg mb-5"
      onClick={() => {
        dispatch(setVideoHistory(videoInfo));
      }}
    >
      <img
        src={snippet.thumbnails.medium.url}
        alt="video thumbnail"
        className="w-full rounded-lg"
      />
      <div className="p-1">
        <h3 className="text-gray-900 font-bold  mb-2 line-clamp-2 ">
          {snippet.title}
        </h3>
        <p className="text-gray-700 mb-1 font-medium ">
          {snippet.channelTitle}
        </p>
        <div className="flex">
          <p className="text-gray-700 font-medium  ">
            {formatNumber(statistics?.viewCount)} views
          </p>
          <p className=" ml-2 font-medium  ">
            ▪ {formattedTimeAgo(snippet?.publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
