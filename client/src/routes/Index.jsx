import {Route, Routes} from "react-router-dom";
import Layout from '../Layout';
import IndexPage from "../pages/home/IndexPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import CreatePost from "../pages/posts/CreatePost";
import PostPage from "../pages/posts/PostPage";
import EditPost from "../pages/posts/EditPost.jsx";

import ProtectedRoute from './ProtectedRoute.jsx';

function AppRoutes (){
    return(
        <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route index element={<IndexPage />} />

        
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Layout />}>

            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Route>
        
      </Routes>
    )
}

export default AppRoutes;