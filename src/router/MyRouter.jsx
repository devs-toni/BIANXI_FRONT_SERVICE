import { Route, Routes } from "react-router-dom";

import Page404 from "../components/User/Page404";
import Register from "../components/User/Register";

export const MyRouter = () => {
  return (
    <Routes>
      <Route path="/my-account" element={<Register />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}