import {Route, Routes} from "react-router-dom";
import Layout from '../Layout';
import IndexPage from "../pages/home/IndexPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import CreatePost from "../pages/posts/CreatePost";
import PostPage from "../pages/posts/PostPage";
import EditPost from "../pages/posts/EditPost.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";
import MyPostsPage from "../pages/posts/MyPostsPage.jsx";
import ProtectedRoute from './ProtectedRoute.jsx';
import NotFound from "../pages/not-found-page/NotFoundPage.jsx";
import SearchPage from "../pages/search/SearchPage.jsx"; 

import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";

function AppRoutes (){
    return(
        <Routes>

        <Route element={<RestrictedRoute/>}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/post/:id" element={<PostPage />}  />
          
          <Route element={<ProtectedRoute/>}>
            <Route path="/my-posts" element={<MyPostsPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
          
        </Route>


        <Route path="*" element={<NotFound/>}/>

        
      </Routes>
    )
}

export default AppRoutes;