import { Link } from "react-router-dom";
import ChannelVideoCard from "./ChannelVideoCard";
import { useEffect, useState } from "react";
import { key } from "../utils/constants";
import LoadingUI from "../shimmerUI/LoadingUI";
import { useSelector } from "react-redux";
import { infiniteScroll } from "../utils/helper";

const ChannelPageShimmerUi = () => {
  const screenSize = useSelector((store) => store.screenSize);
  return (
    <div className={`grid grid-cols-17 w-full `}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className={`bg-white  ${
            screenSize.width < 300 ? "h-48" : "h-56"
          }   p-2 m-1  rounded`}
          key={index}
        >
          <div
            className={`bg-gray-200 ${
              screenSize.width < 300 ? "h-28" : "h-36"
            }  mb-2 rounded`}
          ></div>
          <div className="flex flex-row gap-2 ">
            <div className="bg-gray-200 h-8 w-8 flex-none rounded-full"></div>
            <div className="w-full">
              <div className="bg-gray-200 h-5 w-[90%] mb-2 rounded-sm"></div>
              <div className="bg-gray-200 h-5 w-[70%] rounded-sm"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Videos = ({ channelInfo }) => {
  const [channelVideosList, setChannelVideosList] = useState([]);
  const playListId = channelInfo.contentDetails.relatedPlaylists.uploads;
  const [currentPageInfo, setCurrentPageInfo] = useState({});
  const [pageToken, setPageToken] = useState(null);
  const [endOfPage, setEndOfPage] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(15);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response1 =
        await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${resultsPerPage}&playlistId=${playListId}&key=${key}&pageToken=${
          pageToken || ""
        }
      `);
      const result1 = await response1.json();
      setChannelVideosList((prev) => [...prev, ...result1.items]);
      setCurrentPageInfo(result1);
    };
    getData();
  }, [playListId, resultsPerPage, pageToken]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      infiniteScroll(
        currentPageInfo,
        channelVideosList,
        setLoading,
        setPageToken,
        setResultsPerPage,
        setEndOfPage,
        15
      );
    });

    return () =>
      window.removeEventListener("scroll", () => {
        infiniteScroll(
          currentPageInfo,
          channelVideosList,
          setLoading,
          setPageToken,
          setResultsPerPage,
          setEndOfPage,
          15
        );
      });
  }, [currentPageInfo, channelInfo]);

  return channelVideosList.length === 0 ? (
    <ChannelPageShimmerUi />
  ) : (
    <>
      <div className="grid grid-cols-17  scrollbar-width: none">
        {channelVideosList.map((video) => (
          <Link
            to={`/watch?v=${video.snippet.resourceId.videoId}&channel=${video.snippet.channelId}`}
            key={video.snippet.resourceId.videoId}
          >
            <ChannelVideoCard video={video} />
          </Link>
        ))}
      </div>
      {loading && <LoadingUI />}
      {endOfPage && (
        <p className="font-bold text-center mb-3">No more videos to view!!</p>
      )}
    </>
  );
};

export default Videos;
