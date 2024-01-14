import { Provider } from "react-redux";
import "./App.css";
import Body from "./componenets/Body";
import Head from "./componenets/Head";
import MainContainer from "./componenets/MainContainer";
import WatchPage from "./componenets/WatchPage";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <div>
        <Head />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
