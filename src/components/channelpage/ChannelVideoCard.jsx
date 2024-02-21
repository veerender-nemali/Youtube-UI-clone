import { useDispatch } from "react-redux";
import { formattedTimeAgo } from "../utils/constants";
import { setVideoHistory } from "../utils/slices/historySlice";

const ChannelVideoCard = ({ video }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="m-1"
      onClick={() => {
        dispatch(setVideoHistory(video));
      }}
    >
      <img
        src={video.snippet.thumbnails.medium.url}
        alt="img"
        className="rounded-md w-full"
      />
      <div className="pt-3">
        <h1 className=" line-clamp-2 font-bold">{video.snippet.title}</h1>
        <div className="pt-1">
          <h1 className="">{formattedTimeAgo(video.snippet.publishedAt)}</h1>
        </div>
      </div>
    </div>
  );
};

export default ChannelVideoCard;
