// import React from 'react'

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HorizontalVideoCard from "./HorizontalVideoCard";

const LikedVideos = () => {
  const likedVideosList = useSelector((store) => store.likedVideos.likedVideos);
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  // const screenSize = useSelector((store) => store.screenSize);

  return likedVideosList.length === 0 ? (
    <h1
      className={`text-center pt-5 sm:text-lg ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      }  w-full px-2`}
    >
      There are no videos in this playlist yet.
    </h1>
  ) : (
    //${screenSize.width < 640 ? "grid grid-cols-16" : "flex flex-col"}
    <div
      className={`flex gap-2 px-2 flex-col w-full ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      }`}
    >
      {likedVideosList.map((video, index) => (
        <Link
          to={"/watch?v=" + video.id + "&channel=" + video.snippet.channelId}
          key={index}
        >
          <HorizontalVideoCard video={video} />
        </Link>
      ))}
    </div>
  );
};

export default LikedVideos;
