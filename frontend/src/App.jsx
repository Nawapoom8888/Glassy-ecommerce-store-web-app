import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-center"></ToastContainer>
      <div className="">
        <Header />
        <div className="outlet-container mx-auto flex max-w-6xl items-center justify-center px-4 py-9 min-[300px]:px-6 sm:py-12">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
