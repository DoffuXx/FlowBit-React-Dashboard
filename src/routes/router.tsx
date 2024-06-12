import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "@/pages/dashboard/home";
import ListBlog from "@/pages/dashboard/blogPage/Listblog";
import CreateBlog from "@/pages/dashboard/blogPage/createBlog";
import { ShowBlog } from "@/pages/dashboard/blogPage/showBlog";
import UpdateBlog from "@/pages/dashboard/blogPage/updateBlog";
import ListBoite from "@/pages/dashboard/boitePage/Listboite";
import ShowBoite from "@/pages/dashboard/boitePage/showBoite";
import ContactDetailes from "@/pages/dashboard/coordinatePage/ContactDetailes";
import ListMediatheque from "@/pages/dashboard/MediathequePage/ListMediatheque";
import CreateMediatheque from "@/pages/dashboard/MediathequePage/createMediatheque";
import ShowMediatheque from "@/pages/dashboard/MediathequePage/ShowMediatheque";
import UpdateMediatheque from "@/pages/dashboard/MediathequePage/UpdateMediatheque";
import SettingsPage from "@/pages/dashboard/settingsPage/SettingsPage";
import Login from "@/pages/dashboard/login";
import NotFoundPage from "@/pages/NotFoundPage";
import Layout from "@/pages/dashboard/layout/layout";
import PrivateRoutes from "@/utils/privateRoutes";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
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
          <Route path="contact">
            <Route index element={<ContactDetailes />} />
          </Route>
          {/* Settings Page */}
          <Route path="settings" element={<SettingsPage />} />
          {/* Login Page */}
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      {/* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export default router;
