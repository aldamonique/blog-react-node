import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

export default function Layout(){
    return(
        <main>
            <Header/>
            <main>
            <Outlet/>
            </main>
            <Footer/>
        </main>
        
    );
}