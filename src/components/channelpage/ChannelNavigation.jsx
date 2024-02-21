// import React from 'react'

import { useState } from "react";
import About from "./About";
import Videos from "./Videos";

const ChannelNavigation = ({ channelInfo }) => {
  const [navigation, setNavigation] = useState("videos");

  const changeNavigation = (tabName) => {
    setNavigation(tabName);
  };
  return (
    <div className="">
      <ul className="flex mr-2 pb-1 pl-5 font-bold border border-b-slate-5000 border-x-0 border-t-0 my-6 ">
        <button
          className={`mr-6 pb-2 ${
            navigation === "videos"
              ? "border  border-b-4 border-black border-x-0 border-t-0"
              : ""
          } `}
          onClick={() => changeNavigation("videos")}
        >
          Videos
        </button>
        <button
          className={` pb-2 ${
            navigation === "about"
              ? "border  border-b-4 border-black border-x-0 border-t-0"
              : ""
          }`}
          onClick={() => changeNavigation("about")}
        >
          About
        </button>
      </ul>
      {navigation === "videos" && <Videos channelInfo={channelInfo} />}
      {navigation === "about" && <About info={channelInfo} />}
    </div>
  );
};

export default ChannelNavigation;
