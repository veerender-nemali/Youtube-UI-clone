import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchPageVideoCard from "./SearchPageVideoCard";
import { key } from "./utils/constants";
import { useSelector } from "react-redux";
import LoadingUI from "./shimmerUI/LoadingUI";
import { infiniteScroll } from "./utils/helper";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [queryResultsList, setQueryResultsList] = useState([]);
  const [currentPageInfo, setCurrentPageInfo] = useState({});
  const [pageToken, setPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const urlDecodedQuery = decodeURIComponent(searchParams.get("q"));
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);

  // console.log(currentPageInfo);
  useEffect(() => {
    const getSearchResults = async () => {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultsPerPage}&q=${urlDecodedQuery}&key=${key}&type=video&type=video&pageToken=${
          pageToken || ""
        }`
      );
      const result = await response.json();
      setLoading(false);
      setCurrentPageInfo(result);
      setQueryResultsList((prev) => [...prev, ...result.items]);
    };
    getSearchResults();
  }, [resultsPerPage, urlDecodedQuery, pageToken]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      infiniteScroll(
        currentPageInfo,
        queryResultsList,
        setLoading,
        setPageToken,
        setResultsPerPage,
        setEndOfPage,
        10
      );
    });
    return () => {
      window.removeEventListener("scroll", () => {
        infiniteScroll(
          currentPageInfo,
          queryResultsList,
          setLoading,
          setPageToken,
          setResultsPerPage,
          setEndOfPage,
          10
        );
      });
    };
  }, [currentPageInfo, queryResultsList]);

  return queryResultsList.length === 0 ? (
    <></>
  ) : (
    <div
      className={`w-full ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      } px-1 sm:px-10 mb-10`}
    >
      {queryResultsList.map((result, index) => (
        <SearchPageVideoCard result={result} key={index} />
      ))}
      {loading && <LoadingUI />}
      {endOfPage && (
        <p className="font-bold text-center mb-3">No more videos to view!!</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
