import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu, toggleMenu } from "./utils/slices/MenuSlice";
import VideoInfoData from "./watchpage/VideoInfoData";
import RecommendedVideosList from "./watchpage/RecommendedVideosList";
import WatchPageUI from "./shimmerUI/WatchPageUI";
import { key } from "./utils/constants";
import CommentsSection from "./watchpage/CommentsSection";

const WatchPage = () => {
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  const watchPageVideoId = searchParams.get("v");
  const watchPageChannelId = searchParams.get("channel");
  const [videoInfo, setVideoInfo] = useState([]);
  const [channelInfo, setChannelInfo] = useState();
  const [comments, setComments] = useState([]);
  const screenSize = useSelector((store) => store.screenSize);

  useEffect(() => {
    dispatch(closeMenu());
    window.scrollTo({ top: 0, left: 0 });

    const retriveWatchPageData = async () => {
      try {
        const [response, response_1, response_2] = await Promise.all([
          fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${watchPageVideoId}&key=${key}`
          ),

          fetch(
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${watchPageChannelId}&key=${key}`
          ),
          fetch(
            `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${watchPageVideoId}&key=${key}`
          ),
        ]);

        const [result, result_1, result_2] = await Promise.all([
          response.json(),
          response_1.json(),
          response_2.json(),
        ]);

        setVideoInfo(result.items[0]);
        setChannelInfo(result_1.items[0]);
        setComments(result_2.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    retriveWatchPageData();

    return () => {
      {
        screenSize.width > 900 && dispatch(toggleMenu());
      }
    };
  }, [dispatch, watchPageVideoId, watchPageChannelId, screenSize]);

  return videoInfo.length === 0 ? (
    <>
      <WatchPageUI />
    </>
  ) : (
    <div
      className={` grid ${
        screenSize.width < 900 ? " grid-cols-1" : "grid-cols-3"
      } px-3 sm:px-14  gap-7 pt-5`}
    >
      {screenSize.width < 900 ? (
        <>
          <VideoInfoData videoData={videoInfo} channelInfo={channelInfo} />
          <RecommendedVideosList watchPageVideoId={watchPageVideoId} />

          <CommentsSection
            videoStats={videoInfo.statistics}
            commentsData={comments}
          />
        </>
      ) : (
        <>
          <VideoInfoData
            videoData={videoInfo}
            channelInfo={channelInfo}
            comments={comments}
          />
          <RecommendedVideosList watchPageVideoId={watchPageVideoId} />
        </>
      )}
    </div>
  );
};

export default WatchPage;
