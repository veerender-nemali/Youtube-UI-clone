import {
  removeVideoFromPlaylist,
  setPlayLists,
} from "./utils/slices/playlistSlice";
import { useDispatch } from "react-redux";

const Checkbox = ({ label, videoData, playlists }) => {
  const dispatch = useDispatch();

  const playlistName = playlists[label];
  const isVideoFoundInPlaylist = playlistName.filter(
    (p) => p.id === videoData.id
  );
  const isCheckedHandler = () => {
    if (isVideoFoundInPlaylist.length === 0) return false;
    else return true;
  };
  const isChecked = isCheckedHandler();

  const handleCheckboxChange = () => {
    if (isChecked) {
      dispatch(removeVideoFromPlaylist({ name: label, video: videoData }));
    } else {
      dispatch(setPlayLists({ name: label, video: videoData }));
    }
  };
  return (
    <>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          className=" h-5 w-5 "
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="font-semibold text-lg">{label}</span>
      </label>
    </>
  );
};

export default Checkbox;
