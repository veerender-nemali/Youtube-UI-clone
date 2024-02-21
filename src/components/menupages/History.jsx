import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HorizontalVideoCard from "./HorizontalVideoCard";
import { videoId } from "../utils/helper";

const History = () => {
  const history = useSelector((store) => store.history.historyData);
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);

  return history.length === 0 ? (
    <h1
      className={`text-center pt-5 sm:text-lg ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      }  w-full px-2`}
    >
      This list has no videos
    </h1>
  ) : (
    <div
      className={`flex flex-col ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      }  w-full px-2 gap-2`}
    >
      {history.map((video, index) => (
        <Link
          to={
            "/watch?v=" + videoId(video) + "&channel=" + video.snippet.channelId
          }
          key={index}
        >
          <HorizontalVideoCard video={video} />
        </Link>
      ))}
    </div>
  );
};

export default History;
