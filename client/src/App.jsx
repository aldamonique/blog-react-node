import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./pages/Layout.jsx";
import Post from "./pages/Post.jsx";
import IndexPage from "./pages/IndexPage.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}></Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

        </Route>
      </Routes>
    </>
  );
}

export default App;
