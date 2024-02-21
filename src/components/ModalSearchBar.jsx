import SearchBar from "./SearchBar";

const ModalSearchBar = ({ searchHandler }) => {
  return (
    <div className="fixed z-50 inset-0">
      <div className="fixed inset-0  bg-black opacity-50 z-40 "></div>
      <div className="bg-white z-50 absolute w-full flex items-center p-1">
        <button className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="32"
            viewBox="0 0 24 24"
            onClick={searchHandler}
            // className="h-8 w-10"
          >
            <path
              fill="currentColor"
              d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55z"
            />
          </svg>
        </button>
        <SearchBar />
      </div>
    </div>
  );
};

export default ModalSearchBar;
