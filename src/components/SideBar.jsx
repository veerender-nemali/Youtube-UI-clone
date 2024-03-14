import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { navSvgLinkHandler } from "./utils/constants";
import { closeMenu } from "./utils/slices/MenuSlice";

const NavLink = ({
  linkName,
  setNavigatedTo,
  navigatedTo,
  screenSize,
  dispatch,
}) => {
  return (
    <Link
      to={linkName === "home" ? "/" : `${linkName}`}
      onClick={() => {
        setNavigatedTo(linkName);

        if (screenSize.width < 900) dispatch(closeMenu());
      }}
    >
      <h1
        className={`flex flex-row rounded-md  ${
          screenSize.width < 640
            ? " flex-col items-center justify-center"
            : ` gap-4 pl-3  py-2 ${
                navigatedTo === linkName ? "bg-slate-100" : "hover:bg-slate-100"
              }`
        }  `}
      >
        {navSvgLinkHandler(linkName, navigatedTo, screenSize)}
        {linkName.charAt(0).toUpperCase() + linkName.slice(1)}
      </h1>
    </Link>
  );
};

const SideBar = () => {
  let [searchParams] = useSearchParams();
  const watchPageVideoId = searchParams.get("v");
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  const [navigatedTo, setNavigatedTo] = useState("home");
  const navLinks = ["home", "liked", "history", "subscriptions", "library"];
  const screenSize = useSelector((store) => store.screenSize);
  const dispatch = useDispatch();

  if (screenSize.width >= 640) if (!isMenuOpen) return null; //Early return pattern

  return (
    <div className="">
      {screenSize.width >= 640 ? (
        <div className="h-screen w-56 px-3 pt-4 top-10  fixed bg-white shadow-xl left-0 sm:shadow-none">
          {navLinks.map((linkName) => {
            return (
              <NavLink
                key={linkName}
                linkName={linkName}
                setNavigatedTo={setNavigatedTo}
                navigatedTo={navigatedTo}
                screenSize={screenSize}
                dispatch={dispatch}
              />
            );
          })}
        </div>
      ) : !watchPageVideoId ? (
        <div className="w-full bg-white px-1 py-2 grid grid-cols-3  fixed shadow-xl bottom-0 sm:shadow-none">
          {navLinks.map((linkName) => {
            if (linkName !== "liked" && linkName !== "history") {
              return (
                <NavLink
                  key={linkName}
                  linkName={linkName}
                  setNavigatedTo={setNavigatedTo}
                  navigatedTo={navigatedTo}
                  screenSize={screenSize}
                  dispatch={dispatch}
                />
              );
            }
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SideBar;
