import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import NowPlaying from "./now-playing/NowPlaying";
import ComingSoon from "./coming-soon/ComingSoon";
import Popular from "./popular/Popular";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Popular /> },
      {
        path: "/coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "/now-playing",
        element: <NowPlaying />,
      },
    ],
  },
]);
