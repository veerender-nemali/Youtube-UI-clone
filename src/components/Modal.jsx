import { useState } from "react";
import Checkbox from "./Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { addNewList } from "./utils/slices/playlistSlice";

const Modal = ({ isOpen, onClose, videoData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inpValue, setInpValue] = useState("");
  const dispatch = useDispatch();
  const playlists = useSelector((store) => store.playlist);
  if (!isOpen) return null;
  console.log(playlists);

  const openInpHandler = () => {
    setIsVisible(!isVisible);
  };

  const closeInpHandler = () => {
    setIsVisible(!isVisible);
    dispatch(addNewList({ [inpValue]: [] }));
    setInpValue("");
  };

  const inputHandler = (e) => {
    setInpValue(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-2">
      <div
        className="fixed inset-0 bg-black opacity-20 z-40"
        onClick={onClose}
      ></div>

      <div className=" bg-white w-80 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="py-4 px-6">
          <div className="flex justify-between items-center pb-3">
            <h1 className="text-2xl font-bold">Save to...</h1>
            <button onClick={onClose}>
              <img
                src="https://api.iconify.design/radix-icons:cross-1.svg"
                alt="cross icon"
              />
            </button>
          </div>
          {/* <Checkbox /> */}
          {Object.keys(playlists).map((list, index) => (
            <Checkbox
              key={index}
              label={list}
              videoData={videoData}
              playlists={playlists}
            />
          ))}
          {!isVisible && (
            <h1 className="cursor-pointer pt-2" onClick={openInpHandler}>
              <span className="text-2xl ">+</span> Create new playlist
            </h1>
          )}
          {isVisible && (
            <div className="mt-5">
              <input
                value={inpValue}
                type="text"
                name=""
                id=""
                className="outline-none border border-b-black border-transparent"
                onChange={inputHandler}
              />
              <button
                onClick={closeInpHandler}
                className="px-4 py-2  ml-2  bg-gray-100 rounded-full"
              >
                create
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
