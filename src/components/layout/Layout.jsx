import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollManager from "./ScrollManager";

function Layout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-box focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to main content
      </a>
      <ScrollManager />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
