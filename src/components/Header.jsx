import HamburgerMenu from "../assets/hamburgermenu.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "./utils/slices/MenuSlice";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ModalSearchBar from "./ModalSearchBar";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const screenSize = useSelector((store) => store.screenSize);
  const [smallScreenSearchBar, setSmallScreenSearchBar] = useState(false);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const searchHandler = () => {
    setSmallScreenSearchBar(!smallScreenSearchBar);
  };

  return (
    <div className="flex items-center justify-between fixed bg-white z-10 w-full py-2 sm:py-0 px-1 ">
      <div className="flex items-center mr-2 w-40 ">
        <img
          src={HamburgerMenu}
          alt="HamburgerMenuLogo"
          className="h-7 sm:h-8 pl-2 cursor-pointer"
          onClick={toggleMenuHandler}
        />

        <Link to={"/"}>
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Emblem.png"
            alt="YoutubeLogo"
            className="h-6 sm:h-7 pl-5"
          />
        </Link>
      </div>

      {screenSize.width < 640 ? (
        <>
          <img
            className="h-5 pr-4 cursor-pointer"
            src="https://api.iconify.design/simple-line-icons:magnifier.svg"
            alt="search img"
            onClick={searchHandler}
          />
          {smallScreenSearchBar && (
            <ModalSearchBar searchHandler={searchHandler} />
          )}
        </>
      ) : (
        <SearchBar />
      )}
    </div>
  );
};

export default Header;
