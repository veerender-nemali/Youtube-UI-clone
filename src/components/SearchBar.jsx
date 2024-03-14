// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { cacheResults, setSearchInpValue } from "./utils/slices/searchSlice";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = ({ searchHandler }) => {
  const searchInpValue = useSelector((store) => store.search.searchInpValue);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(searchInpValue);
  const [suggestions, setSuggestions] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState(false);
  const [hideSearchResults, setHideSearchResults] = useState(true);
  const searchCache = useSelector((store) => store.search.searchResults);
  const navigate = useNavigate();
  const screenSize = useSelector((store) => store.screenSize);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the default behavior (form submission)
      navigate(`/search?q=${searchQuery}`);
      setHideSearchResults(false);
      dispatch(setSearchInpValue(searchQuery));
      searchHandler();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchCache]);
      } else {
        getSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSuggestions = async () => {
    const data = await fetch(
      "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
        searchQuery
    );
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  window.onscroll = () => {
    if (!(screenSize.width < 640)) setHideSearchResults(false); // Hide suggestions when scrolling starts
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex justify-center w-full px-2">
        <div className="w-full max-w-md sm:max-w-sm md:max-w-lg ">
          <div className="flex items-center py-2">
            <input
              type="text"
              className="w-full px-4 py-1 sm:py-[6px] text-base  border focus:outline-none rounded-l-full border-gray-400"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHideSearchResults(true);
              }}
              onFocus={() => setSearchSuggestions(true)}
              // onBlur={() => setSearchSuggestions(false)}
              onKeyDown={handleKeyDown}
            />

            <Link to={`/search?q=${searchQuery}`}>
              <button
                className="rounded-r-full p-2 px-4 sm:p-[0.62rem] sm:px-5  border-gray-400 border bg-gray-50"
                onClick={() =>
                  screenSize.width < 640 &&
                  searchHandler() &&
                  dispatch(setSearchInpValue(searchQuery))
                }
              >
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
        {searchSuggestions && hideSearchResults && (
          <div
            className={`absolute mt-14 w-full ${
              screenSize.width < 640 && "left-0"
            } sm:max-w-sm md:max-w-lg  bg-white shadow-2xl rounded-lg overflow-y-auto max-h-[27rem]`}
          >
            <ul className="">
              {suggestions?.map((suggestion, index) => (
                <li
                  className="p-2 text-lg flex items-center shadow-sm cursor-pointer"
                  key={index}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    navigate(`/search?q=${suggestion}`);
                    setSearchSuggestions(false);
                    searchHandler();
                    dispatch(setSearchInpValue(suggestion));
                  }}
                >
                  <img
                    className="h-3 mx-2"
                    src="https://api.iconify.design/simple-line-icons:magnifier.svg"
                    alt="search img"
                  />
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
