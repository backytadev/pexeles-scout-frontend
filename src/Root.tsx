import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

function Root() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
