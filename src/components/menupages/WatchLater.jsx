import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HorizontalVideoCard from "./HorizontalVideoCard";

const WatchLater = () => {
  const { title } = useParams();
  const playlists = useSelector((store) => store.playlist);
  const list = decodeURIComponent(title).replace(/-/g, " ");
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  const history = useSelector((store) => store.history.historyData);
  const liked = useSelector((store) => store.likedVideos.likedVideos);
  const videosList = playlists[list]
    ? playlists[list]
    : list === "history"
    ? history
    : liked;

  return (
    <div
      className={`${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      } w-full px-2 flex flex-col gap-2`}
    >
      <h1 className="font-bold mb-2 text-lg">
        {list.charAt(0).toUpperCase() + list.slice(1)}
      </h1>
      {videosList.length === 0 && (
        <h1 className="mx-auto mt-5">
          No videos are available for viewing at the moment.
        </h1>
      )}
      {videosList.map((video, index) => (
        <Link
          to={"/watch?v=" + video.id + "&channel=" + video.snippet.channelId}
          key={index}
        >
          <HorizontalVideoCard video={video} />
        </Link>
      ))}
    </div>
  );
};

export default WatchLater;
