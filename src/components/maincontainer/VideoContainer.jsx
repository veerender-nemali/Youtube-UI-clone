import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoCardUI from "../shimmerUI/VideoCardUI";
import { key } from "../utils/constants";
import LoadingUI from "../shimmerUI/LoadingUI";
import { useSelector } from "react-redux";
import { infiniteScroll } from "../utils/helper";

const VideoContainer = () => {
  const [videosInfoList, setVideosInfoList] = useState([]);
  const [currentPageInfo, setCurrentPageInfo] = useState({});
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(25);
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);

  useEffect(() => {
    const retriveVideosInfoList = async () => {
      try {
        const data = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&maxResults=${resultsPerPage}&regionCode=IN&key=${key}&part=snippet,statistics&pageToken=${
            pageToken || ""
          }`
        );
        const json = await data.json();
        setVideosInfoList((prev) => [...prev, ...json.items]);
        setCurrentPageInfo(json);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    retriveVideosInfoList();
  }, [pageToken, resultsPerPage]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      infiniteScroll(
        currentPageInfo,
        videosInfoList,
        setLoading,
        setPageToken,
        setResultsPerPage,
        setEndOfPage,
        24
      );
    });

    return () =>
      window.removeEventListener("scroll", () => {
        infiniteScroll(
          currentPageInfo,
          videosInfoList,
          setLoading,
          setPageToken,
          setResultsPerPage,
          setEndOfPage,
          24
        );
      });
  }, [currentPageInfo, videosInfoList]);

  return videosInfoList.length === 0 ? (
    <VideoCardUI />
  ) : (
    <div className={`w-full ${isMenuOpen ? "sm:ml-56" : "sm:mx-3"}`}>
      <div className="grid grid-cols-17 px-2">
        {videosInfoList.map((video) => (
          <Link
            key={video.id}
            to={"/watch?v=" + video.id + "&channel=" + video.snippet.channelId}
          >
            <div className="p-1">
              <VideoCard key={video.id} videoInfo={video} />
            </div>
          </Link>
        ))}
      </div>
      {loading && <LoadingUI />}
      {endOfPage && (
        <p className="font-bold text-center mb-3">
          No more videos to view!!
          {/* <span>This is beacause of api it can only give a few videos</span> */}
        </p>
      )}
    </div>
    // <VideoCardUI />
  );
};

export default VideoContainer;
