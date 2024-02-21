import { Link } from "react-router-dom";
import { formatNumber } from "../utils/constants";
import { setVideoHistory } from "../utils/slices/historySlice";
import { useDispatch } from "react-redux";

const LibraryVideoCard = ({ video }) => {
  const dispatch = useDispatch();
  return (
    <Link
      to={"/watch?v=" + video.id + "&channel=" + video.snippet.channelId}
      onClick={() => {
        dispatch(setVideoHistory(video));
      }}
    >
      <div className=" rounded-md">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt=""
          className="rounded-md"
        />
        <div className="py-1 px-2">
          <h1 className=" line-clamp-2">{video.snippet.title}</h1>
          <h1 className="pt-2">
            {formatNumber(video.statistics.viewCount)} views
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default LibraryVideoCard;
