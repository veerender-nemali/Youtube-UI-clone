import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setVideoHistory } from "../utils/slices/historySlice";
import { useEffect, useState } from "react";
import { key } from "../utils/constants";

const CONTENT_TOPICS = [
  "/m/04rlf",
  "/m/0bzvm2",
  "/m/06ntj",
  "/m/02jjt",
  "/m/019_rr",
  "/m/098wr",
  "/m/01k8wb",
];

const RecommendedVideosList = ({ watchPageVideoId }) => {
  const dispatch = useDispatch();
  const screenSize = useSelector((store) => store.screenSize);
  const [relatedVideosList, setRelatedVideosList] = useState([]);
  const [currentPageInfo, setCurrentPageInfo] = useState({});
  const [pageToken, setPageToken] = useState(null);
  const [endOfPage, setEndOfPage] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(15);

  useEffect(() => {
    const query = Math.floor(Math.random() * CONTENT_TOPICS.length);

    const retriveRelatedVideosList = async () => {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&videoDuration=medium&maxResults=${resultsPerPage}&topicId=${
          CONTENT_TOPICS[query]
        }&type=video&key=${key}&pageToken=${pageToken || ""}`
      );
      const result = await response.json();
      setCurrentPageInfo(result);
      setRelatedVideosList((prev) => [...prev, ...result.items]);
    };
    retriveRelatedVideosList();
  }, [watchPageVideoId, pageToken, resultsPerPage]);

  const loadMoreHandler = () => {
    if (currentPageInfo?.pageInfo.totalResults === relatedVideosList.length) {
      setEndOfPage(true);
      return;
    }
    setPageToken(currentPageInfo.nextPageToken);

    const remainingReslts =
      currentPageInfo.pageInfo?.totalResults - relatedVideosList.length;
    if (15 > remainingReslts) {
      setResultsPerPage(remainingReslts);
    }
  };

  return (
    <div>
      <div
        className={`${
          screenSize.width >= 900
            ? "flex flex-col gap-2"
            : screenSize.width < 450
            ? "grid grid-cols-1 gap-5"
            : "grid grid-cols-2 gap-3"
        }`}
      >
        {relatedVideosList.map((vid) => (
          <Link
            to={
              "/watch?v=" + vid.id.videoId + "&channel=" + vid.snippet.channelId
            }
            key={vid.id.videoId}
          >
            <div
              className={` ${
                screenSize.width >= 900 ? "flex flex-row gap-2" : ""
              }  `}
              key={vid.id.videoId}
              onClick={() => {
                dispatch(setVideoHistory(vid));
              }}
            >
              <div
                className={` ${
                  screenSize.width >= 900 ? "w-40 flex-none" : ""
                } `}
              >
                <img
                  className="rounded-lg w-full"
                  src={vid.snippet.thumbnails.medium.url}
                  alt="thumbnail"
                />
              </div>

              <div>
                <h2 className=" font-semibold line-clamp-2">
                  {vid.snippet.title}
                </h2>
                <p className="line-clamp-1">{vid.snippet.channelTitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {endOfPage ? (
        <h1>End of results</h1>
      ) : (
        <h1
          className="my-4 cursor-pointer font-bold text-center p-2 bg-blue-600 text-white rounded-md"
          onClick={loadMoreHandler}
        >
          Load more
        </h1>
      )}
    </div>
  );
};

export default RecommendedVideosList;
