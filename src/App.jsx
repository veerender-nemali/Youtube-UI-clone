import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./components/utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/maincontainer/MainContainer";
import WatchPage from "./components/WatchPage";
// import LivePage from "./components/LivePage";
import SearchResultsPage from "./components/SearchResultsPage";
import LikedVideos from "./components/menupages/LikedVideos";
import History from "./components/menupages/History";
import WatchLater from "./components/menupages/WatchLater";
import Subscribed from "./components/menupages/Subscribed";
// import CustomPlayLists from "./components/menupages/CustomPlayLists";
import Library from "./components/menupages/Library";
import Channel from "./components/channelpage/Channel";
import Error from "./components/Error";
// import { PersistGate } from "redux-persist/integration/react";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,

      children: [
        {
          path: "/",
          element: <MainContainer />,
          errorElement: <Error />,
        },
        {
          path: "watch",
          element: <WatchPage />,
          errorElement: <Error />,
        },
        {
          path: "search",
          element: <SearchResultsPage />,
        },
        {
          path: "liked",
          element: <LikedVideos />,
        },
        {
          path: "history",
          element: <History />,
        },
        {
          path: "library",
          element: <Library />,
          children: [],
        },
        {
          path: "library/:title",
          element: <WatchLater />,
        },
        {
          path: "channel/:title",
          element: <Channel />,
        },
        {
          path: "subscriptions",
          element: <Subscribed />,
        },
      ],
    },
  ]);
  return (
    <div className="text-xs sm:text-sm md:text:base">
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
