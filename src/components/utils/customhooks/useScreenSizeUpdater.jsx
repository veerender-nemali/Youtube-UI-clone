// useScreenSizeUpdater.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreenSize } from "../slices/screenSizeSlice";

const useScreenSizeUpdater = () => {
  const dispatch = useDispatch();

  const handleResize = () => {
    const newScreenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Dispatch an action to update the screen size in the Redux store
    dispatch(setScreenSize(newScreenSize));
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  // return handleResize;
};

export default useScreenSizeUpdater;
