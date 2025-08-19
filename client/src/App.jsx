import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from './Layout';
import IndexPage from "./pages/home/IndexPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from './pages/auth/RegisterPage.jsx';
import {UserContextProvider} from "./context/UserContext.jsx";
import CreatePost from "./pages/posts/CreatePost";
import PostPage from "./pages/posts/PostPage";
import EditPost from "./pages/posts/EditPost.jsx";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;