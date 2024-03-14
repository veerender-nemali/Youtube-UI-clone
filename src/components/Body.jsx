import { Outlet } from "react-router-dom";
import Header from "./Header";
import useScreenSizeUpdater from "./utils/customhooks/useScreenSizeUpdater";
import SideBar from "./SideBar";
// import { useSelector } from "react-redux";

const Body = () => {
  useScreenSizeUpdater();
  // const screenSize = useSelector(store => store.screenSize)

  return (
    <div className="">
      <Header />
      <div className="flex pt-11 sm:pt-14">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
