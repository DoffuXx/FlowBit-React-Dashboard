import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../pages/dashboard/layout/layout";
import Home from "../pages/dashboard/home";
import ListBlog from "../pages/dashboard/blogPage/Listblog";
import ListBoite from "../pages/dashboard/boitePage/Listboite";
import CreateBlog from "../pages/dashboard/blogPage/createBlog";
import { ShowBlog } from "../pages/dashboard/blogPage/showBlog";
import ShowBoite from "../pages/dashboard/boitePage/showBoite";
import UpdateBlog from "../pages/dashboard/blogPage/updateBlog";
import Login from "../pages/dashboard/login";
import NotFoundPage from "../pages/NotFoundPage";
import ContactDetailes from "../pages/dashboard/coordinatePage/ContactDetailes";
import ListMediatheque from "../pages/dashboard/MediathequePage/ListMediatheque";
import ListDiscours from "../pages/dashboard/DiscoursPage/ListDiscours";
import CreateDiscours from "../pages/dashboard/DiscoursPage/createDiscours";
import CreateMediatheque from "src/pages/dashboard/MediathequePage/createMediatheque";
import ShowDiscours from "src/pages/dashboard/DiscoursPage/showDiscours";
import UpdateDiscours from "src/pages/dashboard/DiscoursPage/updateDiscours";
import UpdateMediatheque from "src/pages/dashboard/MediathequePage/UpdateMediatheque";
import SettingsPage from "src/pages/dashboard/settingsPage/SettingsPage";
import ShowMediatheque from "src/pages/dashboard/MediathequePage/ShowMediatheque";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
        <Route index element={<Home />} />
        {/* Blog Route */}
        <Route path="articles">
          <Route index element={<ListBlog />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path=":id" element={<ShowBlog />} />
          <Route path=":id/edit" element={<UpdateBlog />} />
        </Route>
        {/* Boite Route */}
        <Route path="messages">
          <Route index element={<ListBoite />} />
          <Route path=":id" element={<ShowBoite />} />
        </Route>
        <Route path="coordonnées">
          <Route index element={<ContactDetailes />} />
        </Route>
        <Route path="mediatheque">
          <Route index element={<ListMediatheque />} />
          <Route path="create" element={<CreateMediatheque />} />
          <Route path=":id" element={<ShowMediatheque />} />
          <Route path=":id/edit" element={<UpdateMediatheque />} />
        </Route>
        <Route path="discours">
          <Route index element={<ListDiscours />} />
          <Route path="create" element={<CreateDiscours />} />
          <Route path=":id" element={<ShowDiscours />} />
          <Route path=":id/edit" element={<UpdateDiscours />} />
        </Route>
        {/* Settings Page */}
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      {/* Login Page */}
      <Route path="/login" element={<Login />} />
      {/* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export default router;
