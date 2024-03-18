import { useSelector } from "react-redux";
// import { useRouteError } from "react-router-dom";

const Error = () => {
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  // const error = useRouteError();

  return (
    <div
      className={` min-h-[687px] flex items-center justify-center w-full px-5 ${
        isMenuOpen ? "sm:ml-56" : "sm:mx-3"
      }`}
    >
      <div className="flex flex-col gap-2 items-center text-[#8b8a8a]">
        <div className="font-bold">Whoops</div>
        <div className="text-center">
          We apologize for any inconvenience caused. Our API call limit for
          today has been exceeded due to a high volume of requests. Please try
          again tomorrow.
        </div>
      </div>
    </div>
  );
};

export default Error;
