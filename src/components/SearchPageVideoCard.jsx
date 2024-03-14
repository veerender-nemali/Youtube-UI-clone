import { useNavigate } from "react-router-dom";
import { setVideoHistory } from "./utils/slices/historySlice";
import { useDispatch } from "react-redux";
import { formattedTimeAgo } from "./utils/constants";

const SearchPageVideoCard = ({ result }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {/* to={"/watch?v=" + video.id + "&channel=" + video.snippet.channelId} */}
      <div
        className="flex gap-2 p-1 sm:my-2"
        onClick={() => {
          navigate(
            "/watch?v=" +
              result.id.videoId +
              "&channel=" +
              result.snippet.channelId
          );
          dispatch(setVideoHistory(result));
        }}
      >
        <div className="flex flex-grow-0">
          <div className="aspect-video min-w-[7.5rem] max-w-[16rem]  w-[calc(60px+17vw)]">
            <img
              className="rounded-md  w-full object-contain cursor-pointer"
              src={result.snippet.thumbnails.medium.url}
              alt="video thumbnail"
            />
          </div>
        </div>
        <div className="flex flex-col sm:gap-1 ">
          <h1 className="font-bold  cursor-pointer line-clamp-2">
            {result.snippet.title}
          </h1>
          <h1 className=" line-clamp-1">{result.snippet.channelTitle}</h1>
          <h1>{formattedTimeAgo(result.snippet.publishTime)}</h1>
        </div>
      </div>
    </>
  );
};

export default SearchPageVideoCard;
