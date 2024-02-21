import { useSelector } from "react-redux";

const VideoCardUI = () => {
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);

  return (
    <div
      className={`grid grid-cols-17 w-full ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      } `}
    >
      {Array.from({ length: 15 }).map((_, index) => (
        <div className="bg-white  p-2 m-1 h-56 rounded" key={index}>
          <div className="bg-gray-200 h-36 mb-2 rounded"></div>
          <div className="flex flex-row gap-2 ">
            <div className="bg-gray-200 h-8 w-8 flex-none rounded-full"></div>
            <div className="w-full">
              <div className="bg-gray-200 h-5 w-[90%] mb-2 rounded-sm"></div>
              <div className="bg-gray-200 h-5 w-[70%] rounded-sm"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCardUI;
