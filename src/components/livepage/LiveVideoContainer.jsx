import { useState, useRef, useEffect } from "react";
import VideoCardUI from "../shimmerUI/VideoCardUI";
import { setVideosData } from "../utils/slices/videosDataSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { YOUTUBE_LIVE_API_DATA } from "../utils/constants";
import LiveVideoCard from "./LiveVideoCard";

const LiveVideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const isFirstRender = useRef(true);
  // const videosInfo = useSelector((store) => store.videosInfo.videosData);
  const dispatch = useDispatch();

  // console.log(videos);
  useEffect(() => {
    if (isFirstRender.current) {
      const getVideos = async () => {
        const data = await fetch(YOUTUBE_LIVE_API_DATA);
        const json = await data.json();
        // const items = json.items;
        setVideos(json.items);
        dispatch(setVideosData(json.items));
        // console.log(json.items?);
      };
      getVideos();
      isFirstRender.current = false;
    }
  }, []);

  return videos.length === 0 ? (
    <VideoCardUI />
  ) : (
    <div className="flex flex-wrap">
      {/* <VideoCard videoInfo={videos[0]} /> */}

      {videos.map((video) => (
        <Link key={video.id.videoId} to={"/watch?v=" + video.id.videoId}>
          <LiveVideoCard videoInfo={video} />
        </Link>
      ))}
    </div>
  );
};

export default LiveVideoContainer;
