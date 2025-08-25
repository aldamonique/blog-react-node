import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HeroSection from "./components/header/navbar-aux";

export default function Layout() {
  return (
    <div className="container-base">
      <Header />
      <main>
        <HeroSection/>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
