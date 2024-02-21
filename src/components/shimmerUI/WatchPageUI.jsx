import { useSelector } from "react-redux";

const WatchPageUI = () => {
  const screenSize = useSelector((store) => store.screenSize);

  return (
    // <div className="bg-gradient-to-r from-blue-300 to-blue-500 h-4 animate-shimmer w-full"></div>
    <div
      className={`w-full grid ${
        screenSize.width < 900 ? " grid-cols-1" : "grid-cols-3"
      } px-3 sm:px-14 pt-5 gap-5`}
    >
      <div
        className={`min-w-[235px] ${screenSize.width >= 900 && "col-span-2"}`}
      >
        <div className="aspect-video">
          <div className="w-full h-full bg-black "></div>
        </div>
        <div className="pt-5">
          <div className="h-5 w-[70%] bg-slate-200 mb-3 rounded-sm"></div>
          <div className="h-5 w-[45%] bg-slate-200 rounded-sm"></div>
        </div>
        <div className="h-[1px] w-full bg-slate-200 mt-5"></div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-2 sm:w-full w-2/3 pt-5 items-center">
            <div className="w-9 h-9 flex-none rounded-full bg-slate-200"></div>
            <div className="w-full">
              <div className="h-4  w-[60%] sm:w-[30%] bg-slate-200 rounded-sm"></div>
              <div className="h-4  w-[40%] sm:w-[20%] bg-slate-200 mt-2 sm:mt-4 rounded-sm"></div>
            </div>
          </div>
          <div className="h-7 sm:w-[20%] w-[35%] bg-slate-200 rounded-sm"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div className="flex flex-row gap-2" key={index}>
            {/* <div className="h-[5rem] rounded min-w-[9rem] bg-slate-200"></div> */}
            {/* <div className="min-w-[5rem]"> */}
            <div className="aspect-video">
              <div className="w-full h-full min-w-[9rem] bg-slate-200  rounded-md"></div>
            </div>
            {/* </div> */}
            <div className="w-full">
              <div className="h-5 w-[80%] rounded-sm  bg-slate-200"></div>
              <div className="h-5 w-[55%] rounded-sm mt-2  bg-slate-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchPageUI;
