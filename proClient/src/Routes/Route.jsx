import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import HomePage from "../Pages/HomePage";
import PatientList from "../Pages/PatientList";
import UpdatePage from "../Pages/UpdatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/patientlist",
        element: <PatientList></PatientList>,
      },
      {
        path: "/patient-update/:id",
        element: <UpdatePage></UpdatePage>,
      },
    ],
  },
]);

export default router;
