import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { navLinkSvgs } from "./utils/constants";
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
        className={` pl-3 py-2 rounded-md flex gap-5 items-center ${
          navigatedTo === linkName ? "bg-slate-100" : "hover:bg-slate-100"
        }`}
      >
        {navLinkSvgs[linkName]}
        {linkName.charAt(0).toUpperCase() + linkName.slice(1)}
      </h1>
    </Link>
  );
};

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  const [navigatedTo, setNavigatedTo] = useState("home");
  const navLinks = ["home", "liked", "history", "subscriptions", "library"];
  const screenSize = useSelector((store) => store.screenSize);
  const dispatch = useDispatch();

  useEffect(() => {
    if (screenSize.width < 700) {
      dispatch(closeMenu());
    }
  }, [screenSize.width, dispatch]);

  if (!isMenuOpen) return null; //Early return pattern

  return (
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
  );
};

export default SideBar;
