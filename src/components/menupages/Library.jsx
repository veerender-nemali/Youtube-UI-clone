// import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LibraryVideoCard from "./LibraryVideoCard";

const Library = () => {
  const playlists = useSelector((store) => store.playlist);
  const navigate = useNavigate();
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  const screenSize = useSelector((store) => store.screenSize);

  return (
    <div
      className={`w-full min-w-[13.3rem] px-3 sm:px-8 lg:px-16 ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      }`}
    >
      <h1 className="text-lg sm:text-xl">Playlists</h1>
      {Object.keys(playlists).map((listName, index) => (
        <div className="" key={index}>
          <div className="flex items-center justify-between py-2 border border-b-2 border-x-0 border-t-0">
            <h1 className="font-bold text-sm line-clamp-2 ">
              {listName} {`(${playlists[listName].length})`}
            </h1>
            <button
              className=" bg-gray-200 rounded-full shrink-0 p-1 w-20 hover:bg-gray-100"
              onClick={() => {
                navigate(`/library/${listName.replace(/\s/g, "-")}`);
              }}
            >
              see all
            </button>
          </div>
          {playlists[listName].length === 0 ? (
            <h1 className="">
              No videos are available for viewing at the moment.
            </h1>
          ) : (
            ""
          )}
          {screenSize.width > 640 && (
            <div
              className={`py-2 grid ${
                screenSize.width > 1000 ? "grid-cols-5" : "grid-cols-4"
              } gap-2`}
            >
              {playlists[listName].length > 5
                ? playlists[listName]
                    .slice(0, screenSize.width > 1000 ? 5 : 4)
                    .map((video, index) => (
                      <LibraryVideoCard video={video} key={index} />
                    ))
                : playlists[listName].map((video, index) => (
                    <LibraryVideoCard video={video} key={index} />
                  ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Library;
