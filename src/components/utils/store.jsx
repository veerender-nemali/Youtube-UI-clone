import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slices/MenuSlice";
import videosDataSlice from "./slices/videosDataSlice";
import searchSlice from "./slices/searchSlice";
import chatSlice from "./slices/chatSlice";
import likedVideosSlice from "./slices/LikedVideosSlice";
import historySlice from "./slices/historySlice";
import subscribeSlice from "./slices/subscribeSlice";
import playlistSlice from "./slices/playlistSlice";
import screenSizeSlice from "./slices/screenSizeSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   menu: menuSlice,
//   videosInfo: videosDataSlice,
//   search: searchSlice,
//   chat: chatSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// const persistor = persistStore(store);

// export { store, persistor };

const store = configureStore({
  reducer: {
    menu: menuSlice,
    videosInfo: videosDataSlice,
    search: searchSlice,
    chat: chatSlice,
    likedVideos: likedVideosSlice,
    history: historySlice,
    subscribe: subscribeSlice,
    playlist: playlistSlice,
    screenSize: screenSizeSlice,
  },
});

export default store;
