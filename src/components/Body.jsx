import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import useScreenSizeUpdater from "./utils/customhooks/useScreenSizeUpdater";

const Body = () => {
  useScreenSizeUpdater();

  return (
    <div className="">
      <Header />
      <div className="flex pt-12 sm:pt-14">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
