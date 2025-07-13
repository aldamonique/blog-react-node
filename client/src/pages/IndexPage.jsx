import { Outlet } from "react-router-dom";
import Header from "./Header";
import Post from "./Post";

export default function IndexPage(){
    return(
        <main>
           <Post></Post>
                      
           <Post></Post>
        </main>
        
    );
}