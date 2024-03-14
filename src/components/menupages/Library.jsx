// import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LibraryVideoCard from "./LibraryVideoCard";
import { useState } from "react";
import { addNewList } from "../utils/slices/playlistSlice";

const PlayLists = ({ listName, playLists, screenSize }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between py-2 border border-b-2 border-x-0 border-t-0">
        <h1 className="font-bold text-sm line-clamp-2 ">
          {listName}{" "}
          {Array.isArray(playLists)
            ? `(${playLists.length})`
            : `(${playLists[listName].length})`}
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

      {screenSize.width >= 640
        ? Array.isArray(playLists)
          ? playLists.length === 0 && (
              <h1>No videos are available for viewing at the moment.</h1>
            )
          : playLists[listName].length === 0 && (
              <h1>No videos are available for viewing at the moment.</h1>
            )
        : ""}
    </>
  );
};

const FormPlayList = ({ setIsModalOpen }) => {
  const [inpValue, setInpValue] = useState("");
  const dispatch = useDispatch();

  const createPlayListHandler = () => {
    dispatch(addNewList({ [inpValue]: [] }));
    setInpValue("");
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div
        className="fixed inset-0 bg-black opacity-20 z-40"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className=" w-full flex  flex-col rounded-xl gap-4 p-3 bg-white z-50">
        <h1 className="font-bold">New Playlist</h1>
        <input
          value={inpValue}
          onChange={(e) => setInpValue(e.target.value)}
          type="text"
          placeholder="Enter Title"
          className="p-1 outline-none border-b-black border border-x-0 border-t-0"
        />
        <button
          className="bg-slate-200 w-1/2 m-auto p-1 rounded-xl"
          onClick={() => {
            inpValue !== "" && createPlayListHandler();
          }}
        >
          Create a playlist
        </button>
      </div>
    </div>
  );
};

const Library = () => {
  const playLists = useSelector((store) => store.playlist);
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  const screenSize = useSelector((store) => store.screenSize);
  const history = useSelector((store) => store.history.historyData);
  const liked = useSelector((store) => store.likedVideos.likedVideos);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const playlistFormHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className={`w-full min-w-[13.3rem] px-3 sm:px-8 lg:px-16 ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      }`}
    >
      {isModalOpen && <FormPlayList setIsModalOpen={setIsModalOpen} />}
      <div className="sm:flex sm:justify-between">
        <h1 className="text-lg sm:text-xl">Playlists</h1>
        {screenSize.width > 640 && (
          <button className="w-40 bg-gray-200 rounded-xl  hover:bg-gray-100 py-1">
            Create a Playlist
          </button>
        )}
      </div>
      {screenSize.width < 640 &&
        ["history", "liked"].map((listName, index) => (
          <PlayLists
            key={index}
            listName={listName}
            screenSize={screenSize}
            playLists={listName === "history" ? history : liked}
          />
        ))}

      {Object.keys(playLists).map((listName, index) => (
        <div className="" key={index}>
          <PlayLists
            listName={listName}
            playLists={playLists}
            screenSize={screenSize}
          />

          {screenSize.width > 640 && (
            <div
              className={`py-2 grid ${
                screenSize.width > 1000 ? "grid-cols-5" : "grid-cols-4"
              } gap-2`}
            >
              {playLists[listName].length > 5
                ? playLists[listName]
                    .slice(0, screenSize.width > 1000 ? 5 : 4)
                    .map((video, index) => (
                      <LibraryVideoCard video={video} key={index} />
                    ))
                : playLists[listName].map((video, index) => (
                    <LibraryVideoCard video={video} key={index} />
                  ))}
            </div>
          )}
        </div>
      ))}
      {screenSize.width <= 640 && (
        <button
          className="w-full bg-gray-200 rounded-2xl  hover:bg-gray-100 mt-3 py-2"
          onClick={playlistFormHandler}
        >
          Create a Playlist
        </button>
      )}
    </div>
  );
};

export default Library;
